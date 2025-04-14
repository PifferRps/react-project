<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $tenant = Tenant::create([
            'id' => 'loja',
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
        ]);

        $others = User::factory(4)->create();

        $tenant->users()->attach($admin->id, [
            'role' => 'superadmin',
            'is_active' => true,
        ]);

        foreach ($others as $user) {
            $tenant->users()->attach($user->id, [
                'role' => 'user',
                'is_active' => true,
            ]);
        }
    }
}
