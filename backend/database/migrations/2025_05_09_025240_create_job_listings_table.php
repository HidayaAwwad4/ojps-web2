<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('salary');
            $table->string('location');
            $table->string('category');
            $table->string('languages');
            $table->string('schedule');
            $table->string('experience');
            $table->string('employment');
            $table->string('documents');
            $table->boolean('isOpened');
            $table->integer('employer_id');
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};
