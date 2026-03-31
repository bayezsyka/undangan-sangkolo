<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationGuest extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id', 'name', 'phone', 'location', 
        'category', 'notes', 'guest_code'
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
