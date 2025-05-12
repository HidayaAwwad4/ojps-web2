<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobListing extends Model
{
    protected $fillable = [
        'title',
        'description',
        'salary',
        'location',
        'category',
        'languages',
        'schedule',
        'experience',
        'employment',
        'documents',
        'isOpened',
        'employer_id'
    ];

    public function favoriteJobs(): HasMany
    {
        return $this->hasMany(FavoriteJob::class, 'job_id');
    }

    public function employer(): BelongsTo
    {
        return $this->belongsTo(Employer::class, 'employer_id');
    }
}
