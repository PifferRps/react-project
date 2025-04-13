<?php

namespace App\Modules\Administration\Http\Requests;

use App\Modules\Administration\Models\Employee;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeesRequest extends FormRequest
{
    protected ?Employee $employeeModel = null;

    /**
     * Preparar dados antes da validação começar
     */
    protected function prepareForValidation(): void
    {
        $employeeId = $this->route('employee');

        if ($employeeId && is_numeric($employeeId)) {
            $this->employeeModel = Employee::with('user')->find($employeeId);
        }
    }

    public function rules(): array
    {
        $userId = $this->employeeModel?->user_id;
        $employeeId = $this->employeeModel?->id;

        return [
            // Banco central
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('mysql.users', 'email')->ignore($userId),
            ],
            'password' => [$this->isMethod('POST') ? 'required' : 'nullable', 'confirmed', 'min:8'],

            // Banco tenant
            'cpf' => [
                'required',
                'string',
                'max:20',
                Rule::unique('employees', 'cpf')->ignore($employeeId),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'hire_date' => ['nullable', 'date'],
            'termination_date' => ['nullable', 'date'],
            'postal_code' => ['nullable', 'string', 'max:10'],
            'city' => ['nullable', 'string', 'max:100'],
            'street_address' => ['nullable', 'string', 'max:150'],
            'neighborhood' => ['nullable', 'string', 'max:100'],
        ];
    }
}
