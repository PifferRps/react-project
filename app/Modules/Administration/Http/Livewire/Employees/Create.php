<?php

namespace App\Modules\Administration\Http\Livewire\Employees;

use App\Models\User;
use App\Modules\Administration\Models\Employee;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Livewire\Component;

class Create extends Component
{
    public array $form = [];

    public function save()
    {
        $this->validate([
            'form.name' => 'required|string|max:100',
            'form.email' => 'required|email|max:150|unique:mysql.users,email',
            'form.password' => 'required|min:6|confirmed',
            'form.cpf' => 'required',
            'form.phone' => 'nullable',
            'form.hire_date' => 'nullable|date',
            'form.termination_date' => 'nullable|date',
            'form.postal_code' => 'nullable|string|max:10',
            'form.city' => 'nullable|string|max:100',
            'form.street_address' => 'nullable|string|max:150',
            'form.neighborhood' => 'nullable|string|max:100',
        ]);

        DB::connection('mysql')->beginTransaction();
        try {
            $user = User::create([
                'name' => $this->form['name'],
                'email' => $this->form['email'],
                'password' => Hash::make($this->form['password']),
            ]);

            tenant()->users()->attach($user->id, [
                'role' => 'user',
                'is_active' => true,
            ]);

            DB::connection('mysql')->commit();
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            $this->dispatch('alert', type: 'error', message: 'Erro ao criar usuário: ' . $e->getMessage());
            return;
        }

        Employee::create([
            'user_id' => $user->id,
            'cpf' => $this->form['cpf'],
            'phone' => $this->form['phone'],
            'hire_date' => $this->form['hire_date'],
            'termination_date' => $this->form['termination_date'],
            'postal_code' => $this->form['postal_code'],
            'city' => $this->form['city'],
            'street_address' => $this->form['street_address'],
            'neighborhood' => $this->form['neighborhood'],
        ]);

        return redirect()->route('admin.employees.index')->with('success', 'Colaborador criado com sucesso!');
    }

    public function render()
    {
        return view('administration::employees.create')
            ->layout('layouts.app');
    }
}

