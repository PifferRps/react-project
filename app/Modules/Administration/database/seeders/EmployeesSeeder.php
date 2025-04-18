<?php

namespace App\Modules\Administration\database\seeders;

use App\Models\User;
use App\Modules\Administration\Models\Employee;
use Illuminate\Database\Seeder;

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
