<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class resume extends Model
{
    protected $fillable = [
        'job_seeker_id',
        'file_path',
        'about_me',
        'skills',
        'experience',
        'education',
    ];
    public function jobseeker(){
        return $this->belongsTo(User::class,'job_seeker_id');
    }
}
