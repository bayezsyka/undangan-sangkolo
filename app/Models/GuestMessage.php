<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuestMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id', 'invitation_guest_id', 'name', 
        'relation', 'message', 'is_approved'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }

    public function guest(): BelongsTo
    {
        return $this->belongsTo(InvitationGuest::class, 'invitation_guest_id');
    }
}
