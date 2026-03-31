<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Template extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'category', 'description', 
        'thumbnail', 'preview_url', 
        'default_settings', 'is_active'
    ];

    protected $casts = [
        'default_settings' => 'array',
        'is_active' => 'boolean',
    ];

    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class);
    }
}
