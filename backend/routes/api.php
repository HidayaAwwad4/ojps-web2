<?php

use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ReportsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\JobListingController;
use Illuminate\Http\Request;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteJobController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    //AuthController
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'userProfile']);
    Route::post('/job-seeker/category', [AuthController::class, 'updateCategory']);
    //JobListingController
    Route::post('/jobs', [JobListingController::class, 'create']);
    Route::put('/jobs/{id}', [JobListingController::class, 'update']);
    Route::delete('/jobs/{id}', [JobListingController::class, 'delete']);
    Route::put('/jobs/{id}/status', [JobListingController::class, 'updateStatus']);
    Route::get('/employer', [JobListingController::class, 'getEmployerByUser']);
    Route::get('/employer/{employerId}/jobs', [JobListingController::class, 'getByEmployer']);
    Route::get('/jobs/recommended', [JobListingController::class, 'getRecommendedJobsForSeeker']);
    //NotificationController
    Route::get('/notifications/unread', [NotificationController::class, 'unread']);
    Route::get('/notifications', [NotificationController::class, 'getUserNotifications']);
    Route::post('/notifications/mark-as-read/{id}', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/employer/{employerId}/{type}', [NotificationController::class, 'notifyEmployerActivity']);
    Route::post('/notifications/seeker/{seekerId}/{status}', [NotificationController::class, 'notifySeekerApplicationStatus']);
    //ReportsController
    Route::get('/reports/admin-stats', [ReportsController::class, 'getAdminStats']);
    Route::get('/reports/employer-stats', [ReportsController::class, 'getEmployerStats']);
    Route::get('/reports/admin-bar-chart', [ReportsController::class, 'getAdminBarchartData']);
    Route::get('/reports/employer-Line-chart', [ReportsController::class, 'getEmployerLineChartData']);
    //ApplicationController
    Route::get('/user/cv', [ApplicationController::class, 'getUserCV']);
    Route::post('/applications/submit', [ApplicationController::class, 'submit']);
    Route::get('/applications/by-job-seeker/{jobSeekerId}', [ApplicationController::class, 'getApplicationsByJobSeekerId']);
    Route::post('/applications/upload-cv-and-cover-letter', [ApplicationController::class, 'uploadCVAndCoverLetter']);
    //AdminController
    Route::get('/admin/user-count', [AdminController::class, 'userCount']);
    Route::get('/admin/employer-count', [AdminController::class, 'employerCount']);
    Route::get('/admin/latest-jobs', [AdminController::class, 'latestJobListings']);
    Route::get('/admin/job-seeker-count', [AdminController::class, 'jobSeekerCount']);
    Route::get('/admin/job-listing-count', [AdminController::class, 'jobListingCount']);
    Route::get('/admin/accepted-applications', [AdminController::class, 'acceptedApplicationsCount']);
    Route::get('/admin/rejected-applications', [AdminController::class, 'rejectedApplicationsCount']);
    Route::get('/admin/job-overview-table', [AdminController::class, 'jobOverviewTable']);
    Route::get('/admin/applications-stats', [AdminController::class, 'getApplicationsStats']);
});

// no middleware
//AuthController
Route::get('/roles', [AuthController::class, 'getRoles']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-code', [AuthController::class, 'verifyCode']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-forgot-code', [AuthController::class, 'verifyForgotCode']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);
//JobListingController
Route::get('/jobs', [JobListingController::class, 'getAll']);
Route::get('/jobs/{id}', [JobListingController::class, 'getById']);
Route::get('/jobs/recommended-public', [JobListingController::class, 'getPublicRecommendedJobs']);
Route::get('/search-jobs', [JobListingController::class, 'advancedSearch']);
Route::get('/jobs/category/{category}', [JobListingController::class, 'getJobsByCategory']);
Route::get('/jobs', [JobListingController::class, 'getAll']);
Route::get('/jobs/{id}', [JobListingController::class, 'getById']);
Route::get('/job-form-options', [JobListingController::class, 'getJobFormOptions']);
//CategoryController
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
//FavoriteJobController
Route::get('/favorites', [FavoriteJobController::class, 'index']);
Route::post('/favorites', [FavoriteJobController::class, 'store']);
Route::delete('/favorites/{id}', [FavoriteJobController::class, 'destroy']);
Route::get('/favorites/job-seeker/{jobSeekerId}', [FavoriteJobController::class, 'getByJobSeeker']);
//AdminController
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
Route::get('/admin/latest-jobs', [AdminController::class, 'latestJobListing']);
//ApplicationController
Route::get('/applications', [ApplicationController::class, 'index']);
Route::get('/applications/{id}', [ApplicationController::class, 'show']);
Route::post('/applications', [ApplicationController::class, 'store']);
Route::put('/applications/{id}', [ApplicationController::class, 'update']);
Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
Route::get('/applications/job/{jobId}', [ApplicationController::class, 'getApplicantsByJobId']);
Route::get('/applications/detail/{id}', [ApplicationController::class, 'getApplicationById']);




