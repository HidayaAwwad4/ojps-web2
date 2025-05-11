<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'report_month',
        'total_users',
        'total_job_posted',
        'saved_posts',
        'applications_received',
        'applications_saved',
        'category',
        'category_count'
    ];
}
