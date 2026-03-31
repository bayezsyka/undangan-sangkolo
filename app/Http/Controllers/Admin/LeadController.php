<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $query = Lead::query();

        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name_calon', 'like', "%{$request->search}%")
                  ->orWhere('whatsapp', 'like', "%{$request->search}%");
            });
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $query->latest()->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Leads/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name_calon' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'event_type' => 'required|string',
            'event_date' => 'nullable|date',
            'source' => 'nullable|string',
            'status' => 'required|in:new,contacted,negotiating,closed,lost',
            'notes' => 'nullable|string',
        ]);

        Lead::create($validated);

        return redirect()->route('leads.index')->with('success', 'Lead berhasil ditambahkan.');
    }

    public function show(Lead $lead)
    {
        return Inertia::render('Admin/Leads/Show', [
            'lead' => $lead
        ]);
    }

    public function edit(Lead $lead)
    {
        return Inertia::render('Admin/Leads/Edit', [
            'lead' => $lead
        ]);
    }

    public function update(Request $request, Lead $lead)
    {
        $validated = $request->validate([
            'name_calon' => 'required|string|max:255',
            'whatsapp' => 'required|string|max:20',
            'event_type' => 'required|string',
            'event_date' => 'nullable|date',
            'source' => 'nullable|string',
            'status' => 'required|in:new,contacted,negotiating,closed,lost',
            'notes' => 'nullable|string',
        ]);

        $lead->update($validated);

        return redirect()->route('leads.index')->with('success', 'Lead berhasil diperbarui.');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();
        return redirect()->route('leads.index')->with('success', 'Lead berhasil dihapus.');
    }
}
