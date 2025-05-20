<?php

<<<<<<< HEAD
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\JobListingController;

Route::get('/jobs', [JobListingController::class, 'getAll']);
=======
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteJobController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobListingController;

Route::get('/roles', [AuthController::class, 'getRoles']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-code', [AuthController::class, 'verifyCode']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-forgot-code', [AuthController::class, 'verifyForgotCode']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'userProfile']);
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/applications/{id}', [ApplicationController::class, 'show']);
Route::post('/applications', [ApplicationController::class, 'store']);
Route::put('/applications/{id}', [ApplicationController::class, 'update']);
Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/favorites', [FavoriteJobController::class, 'index']);
Route::post('/favorites', [FavoriteJobController::class, 'store']);
Route::delete('/favorites/{id}', [FavoriteJobController::class, 'destroy']);
Route::get('/favorites/job-seeker/{jobSeekerId}', [FavoriteJobController::class, 'getByJobSeeker']);

>>>>>>> 65882c4a5f7b7009107e68472c766d089bd36e6c
Route::get('/jobs/{id}', [JobListingController::class, 'getById']);
Route::get('/employer/{employerId}/jobs', [JobListingController::class, 'getByEmployer']);
Route::post('/jobs', [JobListingController::class, 'create']);
Route::put('/jobs/{id}', [JobListingController::class, 'update']);
Route::delete('/jobs/{id}', [JobListingController::class, 'delete']);
<<<<<<< HEAD


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













=======
Route::get('/job-form-options', [JobListingController::class, 'getJobFormOptions']);
>>>>>>> 65882c4a5f7b7009107e68472c766d089bd36e6c

