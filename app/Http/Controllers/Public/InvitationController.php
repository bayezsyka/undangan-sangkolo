<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationGuest;
use Inertia\Inertia;

class InvitationController extends Controller
{
    public function show($slug, $guest_code = null)
    {
        $invitation = Invitation::where('slug', $slug)
            ->with([
                'template', 
                'schedules', 
                'giftAccounts' => function($q) {
                    $q->where('is_active', true);
                },
                'galleries' => function($q) {
                    $q->orderBy('order');
                }, 
                'guestMessages' => function($q) {
                    $q->where('is_approved', true)->latest()->take(50);
                }
            ])
            ->firstOrFail();

        // Security: Only allow public to view if published. Admin can preview anytime.
        if (!$invitation->is_published && !auth()->check()) {
            abort(404, 'Undangan ini masih dalam tahap pengerjaan.');
        }

        $guest = null;
        if ($guest_code) {
            $guest = InvitationGuest::where('invitation_id', $invitation->id)
                ->where('guest_code', $guest_code)
                ->with(['rsvp', 'message'])
                ->first();
                
            if (!$guest) abort(404, 'Tautan undangan tidak valid atau sudah kadaluarsa.');
        }

        return Inertia::render('Public/Invitation/Show', [
            'invitation' => $invitation,
            'guest' => $guest
        ]);
    }
}
