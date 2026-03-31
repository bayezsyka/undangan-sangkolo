<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id', 'section_type', 'title', 
        'content', 'order', 'is_active'
    ];

    protected $casts = [
        'content' => 'array', // PHP 8.4 Casts
        'is_active' => 'boolean',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
