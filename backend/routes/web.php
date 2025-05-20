<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobListingController;


Route::get('/jobs', 'App\Http\Controllers\JobListingController@getAll');
Route::get('/jobs/{id}', 'App\Http\Controllers\JobListingController@getById');
Route::get('/employer/{employerId}/jobs', 'App\Http\Controllers\JobListingController@getByEmployer');
Route::post('/jobs', 'App\Http\Controllers\JobListingController@create');
Route::put('/jobs/{id}', 'App\Http\Controllers\JobListingController@update');
Route::delete('/jobs/{id}', 'App\Http\Controllers\JobListingController@delete');








