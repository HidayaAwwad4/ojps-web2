<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Schema::defaultStringLength(191); // تعيين الطول الافتراضي للسلاسل النصية
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }
}
