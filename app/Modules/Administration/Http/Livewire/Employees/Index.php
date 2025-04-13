<?php

namespace App\Modules\Administration\Http\Livewire\Employees;

use App\Http\Livewire\BaseListing;
use App\Modules\Administration\Models\Employee;
use Illuminate\Support\Facades\DB;

class Index extends BaseListing
{
    public string $title = 'Colaboradores';

    protected function query()
    {
        $userIds = tenant()->users()->pluck('users.id');

        $employees = Employee::with('user')
            ->whereIn('user_id', $userIds)
            ->latest()
            ->paginate(10);

        return $employees;

    }

    public function delete($id)
    {
        try {
            $employee = Employee::with('user')->findOrFail($id);

            DB::connection('mysql')->beginTransaction();

            if ($employee->user) {
                tenant()->users()->detach($employee->user->id); // Remove relação com tenant
                $employee->user->delete(); // Remove usuário do banco central
            }

            DB::connection('mysql')->commit();
            $employee->delete(); // Remove o funcionário do banco do tenant
            $this->resetPage();
            $this->dispatch('alert', type: 'success', message: 'Colaborador removido com sucesso!');
        } catch (\Throwable $e) {
            DB::connection('mysql')->rollBack();
            $this->dispatch('alert', type: 'error', message: 'Erro ao remover colaborador: ' . $e->getMessage());
        }
    }


    public function render()
    {

        return view('livewire.base-listing', [
            'items' => $this->query(),
            'itemView' => 'administration::employees.partials.employee-item',
            'action' => view('administration::employees.partials.action-button'),
            'title' => $this->title,
        ])->layout('layouts.app', [
            'breadcrumb' => view('components.breadcrumb', [
                'items' => [
                    ['label' => 'Dashboard', 'url' => route('dashboard')],
                    ['label' => 'Colaboradores'],
                ]
            ]),
        ]);
    }
}
