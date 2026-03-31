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
        'description', 'is_published'
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

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
