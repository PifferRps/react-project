<?php

namespace App\Modules\Administration\database\seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Modules\Administration\Models\Employee;

class EmployeesSeeder extends Seeder
{
    public function run(): void
    {
        // Obtém os 5 primeiros usuários do banco central
        $users = User::take(5)->get();

        foreach ($users as $user) {
            Employee::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
