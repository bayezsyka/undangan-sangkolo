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
        'description', 'is_published'
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
        return $this->hasMany(InvitationSection::class)->orderBy('order');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(Gallery::class)->orderBy('order');
    }

    public function guestMessages(): HasMany
    {
        return $this->hasMany(GuestMessage::class)->latest();
    }

    public function rsvps(): HasMany
    {
        return $this->hasMany(Rsvp::class)->latest();
    }
}
