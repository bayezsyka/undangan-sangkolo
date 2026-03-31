<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Invitation;
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
        ]);

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
        ]);

        $invitation->guestMessages()->create([
            ...$validated,
            'is_approved' => true, // Auto approved for MVP simplicity, can be changed later
        ]);

        return back()->with('success', 'Ucapan doa berhasil dikirim.');
    }
}
