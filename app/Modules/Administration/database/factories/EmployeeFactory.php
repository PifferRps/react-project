<?php

namespace App\Modules\Administration\database\factories;

use App\Modules\Administration\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    protected $model = Employee::class;

    public function definition(): array
    {
        return [
            'user_id' => null, // será preenchido no seeder
            'cpf' => fake()->cpf(),
            'phone' => fake()->phoneNumber(),
            'hire_date' => fake()->date(),
            'termination_date' => null,
            'postal_code' => fake()->postcode(),
            'city' => fake()->city(),
            'street_address' => fake()->streetAddress(),
            'neighborhood' => fake()->word(),
        ];
    }
}
