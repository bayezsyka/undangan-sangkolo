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
            ->where('is_published', true)
            ->with(['template', 'sections' => function($q) {
                $q->where('is_active', true)->orderBy('order');
            }, 'galleries' => function($q) {
                $q->orderBy('order');
            }, 'guestMessages' => function($q) {
                $q->where('is_approved', true)->latest();
            }])
            ->firstOrFail();

        $guest = null;
        if ($guest_code) {
            $guest = InvitationGuest::where('invitation_id', $invitation->id)
                ->where('guest_code', $guest_code)
                ->first();
                
            if (!$guest) abort(404, 'Tautan undangan tidak valid atau sudah kadaluarsa.');
        }

        return Inertia::render('Public/Invitation/Show', [
            'invitation' => $invitation,
            'guest' => $guest
        ]);
    }
}
