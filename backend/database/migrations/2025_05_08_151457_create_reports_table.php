<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->date('report_month');
            $table->integer('total_users');
            $table->integer('total_job_posted');
            $table->integer('saved_posts');
            $table->integer('applications_received');
            $table->integer('applications_saved');
            $table->String('category');
            $table->integer('category_count');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reports');
    }
};
