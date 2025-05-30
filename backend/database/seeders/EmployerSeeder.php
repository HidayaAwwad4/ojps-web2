<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employer;

class EmployerSeeder extends Seeder
{
    public function run(): void
    {
        Employer::factory()->count(10)->create();
    }
}
