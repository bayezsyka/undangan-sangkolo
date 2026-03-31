<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InvitationSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'invitation_id', 'title', 'date', 'start_time', 'end_time', 
        'location_name', 'address', 'maps_url', 'notes', 'sort_order'
    ];

    public function invitation(): BelongsTo
    {
        return $this->belongsTo(Invitation::class);
    }
}
