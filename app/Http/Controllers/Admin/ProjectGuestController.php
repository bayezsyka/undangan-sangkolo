<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\InvitationGuest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Illuminate\Support\Facades\DB;

class ProjectGuestController extends Controller
{
    public function index(Project $project)
    {
        $project->load('invitation');
        
        if (!$project->invitation) {
            return redirect()->route('projects.edit', $project->id)->with('error', 'Buat undangan terlebih dahulu untuk mengelola tamu.');
        }

        $guests = InvitationGuest::where('invitation_id', $project->invitation->id)
            ->latest()
            ->paginate(50);

        return Inertia::render('Admin/Projects/Guests/Index', [
            'project' => $project,
            'guests' => $guests,
            'app_url' => config('app.url')
        ]);
    }

    public function downloadTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        $headers = ['Nama Tamu', 'No HP', 'Tempat', 'Kategori', 'Catatan'];
        
        // Styling Header
        $headerStyle = [
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'startColor' => ['rgb' => '6366F1']]
        ];
        
        $sheet->fromArray($headers, NULL, 'A1');
        $sheet->getStyle('A1:E1')->applyFromArray($headerStyle);
        
        // Example Row
        $sheet->fromArray(['Ahmad Fauzan', '081234567890', 'Jakarta', 'VIP', 'Teman Kantor'], NULL, 'A2');
        
        foreach (range('A', 'E') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);
        $filename = "template_tamu_sangkolo.xlsx";
        
        return response()->streamDownload(function() use ($writer) {
            $writer->save('php://output');
        }, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
    }

    public function export(Project $project)
    {
        $project->load('invitation');
        $guests = InvitationGuest::where('invitation_id', $project->invitation->id)->get();
        
        $filename = "daftar_tamu_" . Str::slug($project->name_project) . ".csv";
        
        $handle = fopen('php://output', 'w');
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        
        fputcsv($handle, ['Nama', 'HP', 'Tempat', 'Kategori', 'Kode', 'Link Undangan']);
        
        foreach ($guests as $guest) {
            fputcsv($handle, [
                $guest->name,
                $guest->phone,
                $guest->location,
                $guest->category,
                $guest->guest_code,
                config('app.url') . "/v/" . $project->invitation->slug . "/" . $guest->guest_code
            ]);
        }
        
        fclose($handle);
        exit;
    }

    public function regenerateCode(Project $project, InvitationGuest $guest)
    {
        // Purge old interactions when link is regenerated
        DB::transaction(function() use ($guest) {
            $guest->rsvp()->delete();
            $guest->message()->delete();
            
            $guest->update([
                'guest_code' => Str::random(8)
            ]);
        });
        
        return back()->with('success', 'Kode tamu berhasil di-reset. Data kehadiran & ucapan lama tamu ini telah dihapus.');
    }

    public function store(Request $request, Project $project)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $project->load('invitation');
        
        InvitationGuest::create(array_merge($validated, [
            'invitation_id' => $project->invitation->id,
            'guest_code' => Str::random(8)
        ]));

        return back()->with('success', 'Tamu baru berhasil ditambahkan.');
    }

    public function update(Request $request, Project $project, InvitationGuest $guest)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'nullable|string|max:20',
            'location' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $guest->update($validated);

        return back()->with('success', 'Data tamu berhasil diperbarui.');
    }

    public function destroy(Project $project, InvitationGuest $guest)
    {
        // Cleanup interactions before deleting guest
        DB::transaction(function() use ($guest) {
            $guest->rsvp()->delete();
            $guest->message()->delete();
            $guest->delete();
        });

        return back()->with('success', 'Tamu dan seluruh respon terkait berhasil dihapus.');
    }

    public function import(Request $request, Project $project)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv|max:2048',
        ]);

        $project->load('invitation');
        if (!$project->invitation) {
            return back()->withErrors(['file' => 'Inisialisasi undangan belum dilakukan.']);
        }

        $file = $request->file('file');
        try {
            $spreadsheet = IOFactory::load($file->getRealPath());
            $sheet = $spreadsheet->getActiveSheet();
            $data = $sheet->toArray();

            if (count($data) < 2) {
                return back()->withErrors(['file' => 'File kosong atau tidak memiliki data tamu.']);
            }

            // Normalisasi Headers: Trim, Lowercase, dan bersihkan dari whitespace
            $headers = array_map(function($h) {
                return Str::slug(trim($h), '_');
            }, $data[0]);

            $requiredHeaders = ['nama_tamu'];
            
            foreach ($requiredHeaders as $req) {
                if (!in_array($req, $headers)) {
                    return back()->withErrors(['file' => "Header kolom '{$req}' atau 'Nama Tamu' tidak ditemukan."]);
                }
            }

            $map = array_flip($headers);
            $success = 0;
            $failed = 0;
            $errors = [];

            DB::beginTransaction();
            foreach (array_slice($data, 1) as $index => $row) {
                $rowNum = $index + 2;
                if (empty(array_filter($row))) continue;

                $name = trim($row[$map['nama_tamu']] ?? '');
                if (empty($name)) {
                    $failed++;
                    $errors[] = "Baris {$rowNum}: Nama tamu kosong.";
                    continue;
                }

                $phone = trim($row[$map['no_hp']] ?? '');
                if ($phone && !str_starts_with($phone, '+')) {
                    $phone = preg_replace('/[^0-9]/', '', $phone);
                }

                try {
                    InvitationGuest::create([
                        'invitation_id' => $project->invitation->id,
                        'name' => $name,
                        'phone' => $phone,
                        'location' => trim($row[$map['tempat']] ?? ''),
                        'category' => trim($row[$map['kategori']] ?? ''),
                        'notes' => trim($row[$map['catatan']] ?? ''),
                        'guest_code' => Str::random(8),
                    ]);
                    $success++;
                } catch (\Exception $e) {
                    $failed++;
                    $errors[] = "Baris {$rowNum}: Gagal simpan (mungkin duplikat atau data tidak valid).";
                }
            }
            DB::commit();

            return back()->with('success_import', [
                'success_count' => $success,
                'failed_count' => $failed,
                'errors' => $errors
            ]);

        } catch (\Exception $e) {
            return back()->withErrors(['file' => 'Gagal membaca file: ' . $e->getMessage()]);
        }
    }
}
