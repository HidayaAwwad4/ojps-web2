<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    protected $fillable = [
        'job_id',
        'job_seeker_id',
        'resume_id',
        'cover_letter',
        'status',
        'appliedAt'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'job_seeker_id');
    }

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function resume(): BelongsTo
    {
        return $this->belongsTo(Resume::class);
    }
}
