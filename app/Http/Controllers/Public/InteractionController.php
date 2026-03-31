<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
use App\Models\InvitationGuest;
use App\Models\Rsvp;
use App\Models\GuestMessage;
use Illuminate\Http\Request;

class InteractionController extends Controller
{
    public function rsvp(Request $request, $slug)
    {
        $invitation = Invitation::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'attendance_status' => 'required|in:attending,maybe,not_attending',
            'guest_count' => 'required|integer|min:1|max:10',
            'notes' => 'nullable|string|max:500',
            'invitation_guest_id' => 'nullable|exists:invitation_guests,id',
        ]);

        // Security: Ensure guest belongs to this invitation
        if (!empty($validated['invitation_guest_id'])) {
            $check = InvitationGuest::where('id', $validated['invitation_guest_id'])
                ->where('invitation_id', $invitation->id)
                ->exists();
            if (!$check) unset($validated['invitation_guest_id']);
        }

        $invitation->rsvps()->create($validated);

        return back()->with('success', 'Konfirmasi kehadiran berhasil dikirim.');
    }

    public function message(Request $request, $slug)
    {
        $invitation = Invitation::where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'relation' => 'nullable|string|max:100',
            'message' => 'required|string|max:1000',
            'invitation_guest_id' => 'nullable|exists:invitation_guests,id',
        ]);

        // Security: Ensure guest belongs to this invitation
        if (!empty($validated['invitation_guest_id'])) {
            $check = InvitationGuest::where('id', $validated['invitation_guest_id'])
                ->where('invitation_id', $invitation->id)
                ->exists();
            if (!$check) unset($validated['invitation_guest_id']);
        }

        $invitation->guestMessages()->create([
            ...$validated,
            'is_approved' => true,
        ]);

        return back()->with('success', 'Ucapan doa berhasil dikirim.');
    }
}
