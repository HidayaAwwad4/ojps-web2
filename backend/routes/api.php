<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteJobController;

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
