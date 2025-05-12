<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FavoriteJob extends Model
{
    protected $fillable = [
        'job_seeker_id',
        'job_id'
    ];
    public function user() {
        return $this->belongsTo(User::class, 'job_seeker_id');
    }

    public function job() {
        return $this->belongsTo(JobListing::class, 'job_id');
    }

}
