<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Lead;
use App\Models\Invitation;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $activeSlotsCount = Project::where('is_active_slot', true)->count();
        $waitingListCount = Project::where('status_order', 'paid')
                                  ->where('is_active_slot', false)
                                  ->where('status_project', '!=', 'finished')
                                  ->count();

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'active_slots' => [
                    'count' => $activeSlotsCount,
                    'total' => 3,
                    'is_full' => $activeSlotsCount >= 3,
                ],
                'leads_count' => Lead::where('status', 'new')->count(),
                'waiting_list_count' => $waitingListCount,
                'draft_invitations' => Invitation::where('is_published', false)->count(),
                'published_invitations' => Invitation::where('is_published', true)->count(),
            ],
            'recent_projects' => Project::with('client')->latest()->take(5)->get(),
            'recent_leads' => Lead::latest()->take(5)->get(),
        ]);
    }
}
