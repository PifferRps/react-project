<?php

namespace App\Modules\Administration\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Administration\Http\Requests\EmployeesRequest;
use App\Modules\Administration\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    public function index()
    {
        $userIds = tenant()->users()->pluck('users.id');

        $employees = Employee::with('user')
            ->whereIn('user_id', $userIds)
            ->latest()
            ->paginate(10);

        return Inertia::render('Administration/Employees/Index', [
            'employees' => $employees,
        ]);
    }


    public function create()
    {
     return Inertia::render('Administration/Employees/Create');

    }

    public function store(EmployeesRequest $request)
    {
        $data = $request->validated();

        DB::connection('mysql')->beginTransaction('');

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            tenant()->users()->attach($user->id, [
                'role' => 'user',
                'is_active' => true,
            ]);

            DB::connection('mysql')->commit();
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            return back()->with('error', 'Erro ao criar usuário: ' . $e->getMessage());
        }

        Employee::create([
            'user_id' => $user->id,
            'cpf' => $data['cpf'],
            'phone' => $data['phone'],
            'hire_date' => $data['hire_date'],
            'termination_date' => $data['termination_date'],
            'postal_code' => $data['postal_code'],
            'city' => $data['city'],
            'street_address' => $data['street_address'],
            'neighborhood' => $data['neighborhood'],
        ]);

        return redirect()->route('admin.employees.index')->with('success', 'Colaborador criado com sucesso!');
    }

    public function edit(Request $request, $id)
    {
        $employee = Employee::with('user')->findOrFail($id);

        return Inertia::render('Administration/Employees/Edit', [
            'employee' => $employee,
        ]);
    }


    public function update(EmployeesRequest $request, $id)
    {
        $employee = Employee::with('user')->findOrFail($id);
        $data = $request->validated();
        // Atualiza o usuário (banco central)
        DB::connection('mysql')->beginTransaction();
        try {
            $user = $employee->user;
            $user->name = $data['name'];
            $user->email = $data['email'];

            if (!empty($data['password'])) {
                $user->password = Hash::make($data['password']);
            }

            $user->save();
            DB::connection('mysql')->commit();
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            return back()->with('error', 'Erro ao atualizar usuário: ' . $e->getMessage());
        }

        // Atualiza os dados do colaborador no banco do tenant
        $employee->update([
            'cpf' => $data['cpf'],
            'phone' => $data['phone'],
            'hire_date' => $data['hire_date'],
            'termination_date' => $data['termination_date'],
            'postal_code' => $data['postal_code'],
            'city' => $data['city'],
            'street_address' => $data['street_address'],
            'neighborhood' => $data['neighborhood'],
        ]);

        return redirect()->route('admin.employees.index')->with('success', 'Colaborador atualizado com sucesso!');
    }


    public function destroy($id)
    {
        $employee = Employee::with('user')->findOrFail($id);

        DB::connection('mysql')->beginTransaction();

        try {

            if ($employee->user) {
                tenant()->users()->detach($employee->user->id);

                $employee->user->delete();
            }

            DB::connection('mysql')->commit();
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            return back()->with('error', 'Erro ao remover o usuário: ' . $e->getMessage());
        }

        $employee->delete();

        return redirect()->route('admin.employees.index')->with('success', 'Colaborador removido com sucesso!');
    }
}
