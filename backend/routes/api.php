<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\JobListingController;

Route::get('/jobs', [JobListingController::class, 'getAll']);
Route::get('/jobs/{id}', [JobListingController::class, 'getById']);
Route::get('/employer/{employerId}/jobs', [JobListingController::class, 'getByEmployer']);
Route::post('/jobs', [JobListingController::class, 'create']);
Route::put('/jobs/{id}', [JobListingController::class, 'update']);
Route::delete('/jobs/{id}', [JobListingController::class, 'delete']);


Route::get('/admin/users', [AdminController::class, 'allUsers']);
Route::post('/admin/users', [AdminController::class, 'addUser']);
Route::put('/admin/users/{id}', [AdminController::class, 'updateUser']);
Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser']);

Route::get('admin/employers/pending', [AdminController::class, 'pendingEmployerRequests']);
Route::post('admin/employers/{id}/approve', [AdminController::class, 'approveEmployer']);
Route::post('admin/employers/{id}/reject', [AdminController::class, 'rejectEmployer']);

Route::get('/admin/job-stats', [AdminController::class, 'jobDemandStats']);
Route::get('/admin/job-listings', [AdminController::class, 'allJobListings']);
Route::delete('/admin/job-listings/{id}', [AdminController::class, 'deleteJobListing']);


Route::get('/admin/user-count', [AdminController::class, 'userCount']);
Route::get('/admin/employer-count', [AdminController::class, 'employerCount']);
Route::get('/admin/job-seeker-count', [AdminController::class, 'jobSeekerCount']);
Route::get('/admin/job-listing-count', [AdminController::class, 'jobListingCount']);
Route::get('/admin/accepted-applications', [AdminController::class, 'acceptedApplicationsCount']);
Route::get('/admin/rejected-applications', [AdminController::class, 'rejectedApplicationsCount']);
Route::get('/admin/latest-jobs', [AdminController::class, 'latestJobListings']);














