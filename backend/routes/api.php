<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobListingController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/jobs/{id}', [JobListingController::class, 'getById']);
Route::get('/employer/{employerId}/jobs', [JobListingController::class, 'getByEmployer']);
Route::post('/jobs', [JobListingController::class, 'create']);
Route::put('/jobs/{id}', [JobListingController::class, 'update']);
Route::delete('/jobs/{id}', [JobListingController::class, 'delete']);
Route::get('/job-form-options', [JobListingController::class, 'getJobFormOptions']);

