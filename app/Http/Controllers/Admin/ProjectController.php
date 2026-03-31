<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use App\Models\Template;
use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with(['client', 'invitation']);

        if ($request->search) {
            $query->where('name_project', 'like', "%{$request->search}%")
                  ->orWhereHas('client', function($q) use ($request) {
                      $q->where('name', 'like', "%{$request->search}%");
                  });
        }

        if ($request->status) {
            $query->where('status_project', $request->status);
        }

        return Inertia::render('Admin/Projects/Index', [
            'projects' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
            'active_slots_count' => Project::where('is_active_slot', true)->count(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Projects/Create', [
            'clients' => Client::orderBy('name')->get(),
            'can_activate_slot' => Project::where('is_active_slot', true)->count() < 3,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'name_project' => 'required|string|max:255',
            'event_type' => 'required|string',
            'event_date' => 'required|date',
            'status_order' => 'required|in:pending,paid,cancelled',
            'status_project' => 'required|in:queue,designing,revision,finished',
            'is_active_slot' => 'required|boolean',
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        if ($validated['is_active_slot']) {
            if (Project::where('is_active_slot', true)->count() >= 3) {
                return back()->withErrors(['is_active_slot' => 'Slot aktif sudah penuh (maksimal 3). Silakan masukkan ke waiting list terlebih dahulu.']);
            }
        }

        Project::create($validated);

        return redirect()->route('projects.index')->with('success', 'Project berhasil dibuat.');
    }

    public function show(Project $project)
    {
        $project->load([
            'client', 
            'invitation.template', 
            'invitation.schedules', 
            'invitation.giftAccounts', 
            'invitation.galleries',
            'invitation.rsvps' => function($q) {
                 $q->latest();
            },
            'invitation.guestMessages' => function($q) {
                 $q->latest();
            }
        ]);
        
        $invite = $project->invitation;
        $guests_count = $invite ? $invite->guests()->count() : 0;
        $rsvps = $invite ? $invite->rsvps : collect();
        
        // Stats
        $attending_count = $rsvps->where('attendance_status', 'attending')->sum('guest_count');
        $not_attending_count = $rsvps->where('attendance_status', 'not_attending')->count();
        $maybe_count = $rsvps->where('attendance_status', 'maybe')->count();

        // Publish Checklist
        $checklist = [
            'template_selected' => !empty($invite?->template_id),
            'mempelai_complete' => !empty($invite?->bride_full_name && $invite?->groom_full_name),
            'event_schedule_exists' => $invite ? $invite->schedules()->count() > 0 : false,
            'slug_valid' => !empty($invite?->slug),
            'has_guests' => $guests_count > 0,
        ];

        $ready_score = count(array_filter($checklist));
        $is_ready_to_publish = $ready_score === count($checklist);

        return Inertia::render('Admin/Projects/Show', [
            'project' => $project,
            'stats' => [
                'guests_count' => $guests_count,
                'rsvp_count' => $rsvps->count(),
                'attending_total' => $attending_count,
                'maybe_total' => $maybe_count,
                'not_attending_total' => $not_attending_count,
                'gallery_count' => $invite ? $invite->galleries()->count() : 0,
            ],
            'checklist' => $checklist,
            'is_ready_to_publish' => $is_ready_to_publish,
            'publish_progress' => round(($ready_score / count($checklist)) * 100),
            'app_url' => config('app.url'),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project->load([
                'client', 
                'invitation.template', 
                'invitation.schedules', 
                'invitation.giftAccounts',
                'invitation.galleries'
            ]),
            'clients' => Client::orderBy('name')->get(),
            'templates' => Template::where('is_active', true)->get(),
            'active_slots_count' => Project::where('is_active_slot', true)->where('id', '!=', $project->id)->count(),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            // Project Core
            'client_id' => 'required|exists:clients,id',
            'name_project' => 'required|string|max:255',
            'event_type' => 'required|string',
            'event_date' => 'required|date',
            'status_order' => 'required|in:pending,paid,cancelled',
            'status_project' => 'required|in:queue,designing,revision,finished',
            'is_active_slot' => 'required|boolean',
            'deadline' => 'nullable|date',
            'notes' => 'nullable|string',
            
            // Invitation Data
            'invitation.template_id' => 'nullable|exists:templates,id',
            'invitation.slug' => 'nullable|string|max:255|unique:invitations,slug,' . ($project->invitation->id ?? 'NULL'),
            'invitation.host_names' => 'nullable|string|max:255',
            'invitation.invitation_type' => 'nullable|string',
            'invitation.opening_label' => 'nullable|string',
            'invitation.bride_full_name' => 'nullable|string',
            'invitation.bride_nickname' => 'nullable|string',
            'invitation.bride_father_name' => 'nullable|string',
            'invitation.bride_mother_name' => 'nullable|string',
            'invitation.groom_full_name' => 'nullable|string',
            'invitation.groom_nickname' => 'nullable|string',
            'invitation.groom_father_name' => 'nullable|string',
            'invitation.groom_mother_name' => 'nullable|string',
            'invitation.wedding_date' => 'nullable|date',
            'invitation.countdown_datetime' => 'nullable|date_format:Y-m-d H:i:s',
            'invitation.event_location_name' => 'nullable|string',
            'invitation.event_time' => 'nullable|string',
            'invitation.event_address' => 'nullable|string',
            'invitation.event_maps_url' => 'nullable|string',
            'invitation.hero_subtitle' => 'nullable|string',
            'invitation.opening_quote' => 'nullable|string',
            'invitation.closing_note' => 'nullable|string',
            'invitation.gift_note' => 'nullable|string',
            'invitation.is_published' => 'boolean',
            
            // Related Data
            'schedules' => 'nullable|array',
            'gift_accounts' => 'nullable|array',
        ]);

        if ($validated['is_active_slot'] && !$project->is_active_slot) {
            if (Project::where('is_active_slot', true)->count() >= 3) {
                return back()->withErrors(['is_active_slot' => 'Slot aktif sudah penuh (maksimal 3).']);
            }
        }

        DB::transaction(function () use ($project, $validated, $request) {
            $project->update($validated);

            // Handle Invitation
            if (isset($validated['invitation'])) {
                $inviteData = $validated['invitation'];
                
                if (empty($inviteData['slug'])) {
                    $inviteData['slug'] = Str::slug($project->name_project) . '-' . rand(10, 99);
                }
                
                $inviteData['title'] = $project->name_project;

                $invitation = $project->invitation()->updateOrCreate(
                    ['project_id' => $project->id],
                    $inviteData
                );

                // Handle Schedules
                if (isset($validated['schedules'])) {
                    $invitation->schedules()->delete();
                    foreach ($validated['schedules'] as $index => $schedule) {
                        if (!empty($schedule['title'])) {
                            $invitation->schedules()->create(array_merge($schedule, ['sort_order' => $index]));
                        }
                    }
                }

                // Handle Gift Accounts
                if (isset($validated['gift_accounts'])) {
                    $invitation->giftAccounts()->delete();
                    foreach ($validated['gift_accounts'] as $index => $account) {
                        if (!empty($account['bank_name'])) {
                            $invitation->giftAccounts()->create(array_merge($account, ['sort_order' => $index]));
                        }
                    }
                }
            }
        });

        return redirect()->route('projects.show', $project->id)->with('success', 'Perubahan berhasil disimpan.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project berhasil dihapus.');
    }
}
