<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Rsvp;
use Inertia\Inertia;

class RsvpController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Admin/RSVP/Index', [
            'rsvps' => Rsvp::with('invitation.project.client')->latest()->paginate(20),
        ]);
    }
}
