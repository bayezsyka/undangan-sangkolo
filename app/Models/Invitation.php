<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Invitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id', 'template_id', 'slug', 'title', 
        'host_names', 'cover_image', 'background_music', 
        'event_time', 'event_location_name', 'event_address', 
        'event_maps_url', 'opening_quote',
        'description', 'is_published',
        'invitation_type', 'opening_label', 'bride_full_name', 'bride_nickname',
        'bride_father_name', 'bride_mother_name', 'groom_full_name', 'groom_nickname',
        'groom_father_name', 'groom_mother_name', 'wedding_date', 'countdown_datetime',
        'hero_subtitle', 'closing_note', 'gift_note', 'published_at'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'wedding_date' => 'date',
        'countdown_datetime' => 'datetime',
        'published_at' => 'datetime',
    ];

    public function schedules(): HasMany
    {
        return $this->hasMany(InvitationSchedule::class)->orderBy('sort_order');
    }

    public function giftAccounts(): HasMany
    {
        return $this->hasMany(GiftAccount::class)->orderBy('sort_order');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function template(): BelongsTo
    {
        return $this->belongsTo(Template::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(InvitationSection::class);
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(Gallery::class);
    }

    public function guestMessages(): HasMany
    {
        return $this->hasMany(GuestMessage::class);
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class);
    }

    public function guests(): HasMany
    {
        return $this->hasMany(InvitationGuest::class);
    }
}
