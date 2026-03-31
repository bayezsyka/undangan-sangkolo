<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id', 'name_project', 'event_type', 'event_date', 
        'status_order', 'status_project', 'is_active_slot', 
        'deadline', 'notes'
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function invitation(): HasOne
    {
        return $this->hasOne(Invitation::class);
    }

    public function scopeActiveSlot(Builder $query): void
    {
        $query->where('is_active_slot', true);
    }

    public function scopeWaitingList(Builder $query): void
    {
        $query->where('status_order', 'paid')
              ->where('is_active_slot', false)
              ->where('status_project', '!=', 'finished');
    }
}
