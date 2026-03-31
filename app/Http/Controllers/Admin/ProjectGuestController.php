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
        $headers = ['nama_tamu', 'no_hp', 'tempat', 'kategori', 'catatan'];
        $filename = "template_tamu_sangkolo.csv";
        
        $handle = fopen('php://output', 'w');
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="'.$filename.'"');
        
        fputcsv($handle, $headers);
        fclose($handle);
        exit;
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
        $guest->update([
            'guest_code' => Str::random(8)
        ]);
        
        return back()->with('success', 'Kode tamu berhasil diperbarui.');
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

            $headers = array_map('strtolower', array_map('trim', $data[0]));
            $requiredHeaders = ['nama_tamu'];
            
            foreach ($requiredHeaders as $req) {
                if (!in_array($req, $headers)) {
                    return back()->withErrors(['file' => "Header kolom '{$req}' tidak ditemukan."]);
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
