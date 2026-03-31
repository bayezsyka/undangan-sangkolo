<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LeadController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\RsvpController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public / Guest Routes
Route::middleware('guest')->group(function () {
    Route::get('/v/{slug}', [\App\Http\Controllers\Public\InvitationController::class, 'show'])->name('invitation.show');
    Route::post('/v/{slug}/rsvp', [\App\Http\Controllers\Public\InteractionController::class, 'rsvp'])->name('invitation.rsvp');
    Route::post('/v/{slug}/message', [\App\Http\Controllers\Public\InteractionController::class, 'message'])->name('invitation.message');

    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

// Protected Admin Routes
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::resource('/leads', LeadController::class);
    Route::resource('/projects', ProjectController::class);
    Route::resource('/templates', TemplateController::class);
    Route::get('/rsvp', RsvpController::class)->name('rsvp.index');
    Route::get('/settings', SettingsController::class)->name('settings.index');
    
    Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');
});

// Root Redirect
Route::get('/', function () {
    return redirect()->route('dashboard');
})->middleware('auth');

Route::get('/', function () {
    return redirect()->route('login');
})->middleware('guest');
