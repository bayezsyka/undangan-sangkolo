<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('client');

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
        return Inertia::render('Admin/Projects/Show', [
            'project' => $project->load('client', 'invitation')
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('Admin/Projects/Edit', [
            'project' => $project,
            'clients' => Client::orderBy('name')->get(),
            'active_slots_count' => Project::where('is_active_slot', true)->where('id', '!=', $project->id)->count(),
        ]);
    }

    public function update(Request $request, Project $project)
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

        if ($validated['is_active_slot'] && !$project->is_active_slot) {
            if (Project::where('is_active_slot', true)->count() >= 3) {
                return back()->withErrors(['is_active_slot' => 'Slot aktif sudah penuh (maksimal 3).']);
            }
        }

        $project->update($validated);

        return redirect()->route('projects.index')->with('success', 'Project berhasil diperbarui.');
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect()->route('projects.index')->with('success', 'Project berhasil dihapus.');
    }
}
