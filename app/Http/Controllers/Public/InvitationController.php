<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function show($slug)
    {
        $invitation = Invitation::where('slug', $slug)
            ->where('is_published', true)
            ->with(['template', 'sections', 'galleries', 'guestMessages' => function($q) {
                $q->where('is_approved', true)->latest();
            }])
            ->firstOrFail();

        return Inertia::render('Public/Invitation/Show', [
            'invitation' => $invitation
        ]);
    }
}
