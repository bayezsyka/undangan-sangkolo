<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TemplateController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ProjectGuestController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Public\InvitationController;
use App\Http\Controllers\Public\InteractionController;
use Illuminate\Support\Facades\Route;

// Public / Invitation Routes (Accessible by all)
Route::get('/v/{slug}/{guest_code?}', [InvitationController::class, 'show'])->name('invitation.show');
Route::post('/v/{slug}/rsvp', [InteractionController::class, 'rsvp'])->name('invitation.rsvp');
Route::post('/v/{slug}/message', [InteractionController::class, 'message'])->name('invitation.message');

// Guest & Auth Management
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'show'])->name('login');
    Route::post('/login', [LoginController::class, 'store']);
});

Route::middleware('auth')->post('/logout', [LoginController::class, 'destroy'])->name('logout');

// Protected Admin Panel
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    
    // Core Modules
    Route::resource('/clients', ClientController::class);
    Route::resource('/projects', ProjectController::class);
    Route::resource('/templates', TemplateController::class);
    
    // Account Settings
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password.update');

    // Guest Management (Slug-based)
    Route::prefix('projects/{project:slug}')->group(function() {
        Route::get('/guests', [ProjectGuestController::class, 'index'])->name('projects.guests.index');
        Route::post('/guests', [ProjectGuestController::class, 'store'])->name('projects.guests.store');
        Route::put('/guests/{guest}', [ProjectGuestController::class, 'update'])->name('projects.guests.update');
        Route::delete('/guests/{guest}', [ProjectGuestController::class, 'destroy'])->name('projects.guests.destroy');
        Route::post('/guests/import', [ProjectGuestController::class, 'import'])->name('projects.guests.import');
        Route::get('/guests/template', [ProjectGuestController::class, 'downloadTemplate'])->name('projects.guests.template');
        Route::get('/guests/export', [ProjectGuestController::class, 'export'])->name('projects.guests.export');
        Route::post('/guests/{guest}/regenerate', [ProjectGuestController::class, 'regenerateCode'])->name('projects.guests.regenerate');
        
        Route::post('/publish', [ProjectController::class, 'togglePublish'])->name('projects.publish');
    });
});

// Root Redirects
Route::middleware('auth')->get('/', fn() => redirect()->route('dashboard'));
Route::middleware('guest')->get('/', fn() => redirect()->route('login'));
