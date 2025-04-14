<?php

namespace Database\Seeders;

use App\Modules\Administration\database\seeders\EmployeesSeeder;
use Illuminate\Database\Seeder;

class TenantDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(EmployeesSeeder::class);
    }
}
