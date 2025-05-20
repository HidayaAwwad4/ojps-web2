<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationController;


    Route::post('/notifications/seeker', [NotificationController::class, 'notifySeekerApplicationStatus']);
    Route::post('/notifications/employer', [NotificationController::class, 'notifyEmployerActivity']);

