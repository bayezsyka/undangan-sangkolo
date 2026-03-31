<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'name_calon', 'whatsapp', 'event_type', 
        'event_date', 'source', 'status', 'notes'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
