<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
}
