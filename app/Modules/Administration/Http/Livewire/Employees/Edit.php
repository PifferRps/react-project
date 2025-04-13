<?php

namespace App\Modules\Administration\Http\Livewire\Employees;

use App\Models\User;
use App\Modules\Administration\Models\Employee;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Livewire\Component;

class Edit extends Component
{
    public $employee;
    public array $form = [];

    public function mount($id)
    {
        $this->employee = Employee::with('user')->findOrFail($id);

        $this->form = [
            'name' => $this->employee->user->name ?? '',
            'email' => $this->employee->user->email ?? '',
            'cpf' => $this->employee->cpf ?? '',
            'phone' => $this->employee->phone ?? '',
            'hire_date' => optional($this->employee->hire_date)->format('Y-m-d'),
            'termination_date' => optional($this->employee->termination_date)->format('Y-m-d'),
            'postal_code' => $this->employee->postal_code ?? '',
            'city' => $this->employee->city ?? '',
            'street_address' => $this->employee->street_address ?? '',
            'neighborhood' => $this->employee->neighborhood ?? '',
            'password' => '',
            'password_confirmation' => '',
        ];
    }

    public function save()
    {
        $userId = $this->employee->user_id;

        $validated = $this->validate([
            'form.name' => ['required', 'string', 'max:255'],
            'form.email' => [
                'required', 'email', 'max:255',
                Rule::unique('mysql.users', 'email')->ignore($userId),
            ],
            'form.password' => ['nullable', 'confirmed', 'min:8'],
            'form.cpf' => [
                'required', 'string', 'max:20',
                Rule::unique('employees', 'cpf')->ignore($this->employee->id),
            ],
            'form.phone' => ['nullable', 'string', 'max:20'],
            'form.hire_date' => ['nullable', 'date'],
            'form.termination_date' => ['nullable', 'date'],
            'form.postal_code' => ['nullable', 'string', 'max:10'],
            'form.city' => ['nullable', 'string', 'max:100'],
            'form.street_address' => ['nullable', 'string', 'max:150'],
            'form.neighborhood' => ['nullable', 'string', 'max:100'],
        ]);

        try {
            DB::connection('mysql')->beginTransaction();

            $user = $this->employee->user;
            $user->name = $this->form['name'];
            $user->email = $this->form['email'];
            if (!empty($this->form['password'])) {
                $user->password = Hash::make($this->form['password']);
            }
            $user->save();

            DB::connection('mysql')->commit();
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            $this->dispatch('alert', type: 'error', message: 'Erro ao atualizar usuário: ' . $e->getMessage());
            return;
        }

        $this->employee->update([
            'cpf' => $this->form['cpf'],
            'phone' => $this->form['phone'],
            'hire_date' => $this->form['hire_date'],
            'termination_date' => $this->form['termination_date'],
            'postal_code' => $this->form['postal_code'],
            'city' => $this->form['city'],
            'street_address' => $this->form['street_address'],
            'neighborhood' => $this->form['neighborhood'],
        ]);

        return redirect()->route('admin.employees.index')
            ->with('success', 'Colaborador atualizado com sucesso!');
    }

    public function render()
    {
        return view('administration::employees.edit')->layout('layouts.app');
    }
}
