<?php

namespace App\Modules\Administration\Http\Livewire;

use Livewire\Component;
use App\Modules\Administration\Models\Team;
use App\Modules\Administration\Models\Employee;
use Illuminate\Database\Eloquent\Collection;

class TeamsEmployeesLivewire extends Component
{
    public int $teamId;
    public string $search = '';
    public array $selectedEmployees = [];

    protected $listeners = ['refreshTeamEmployees' => '$refresh'];

    public function mount(int $teamId): void
    {
        $this->teamId = $teamId;
    }

    public function getEmployeesProperty(): Collection
    {
        return Team::findOrFail($this->teamId)
            ->employees()
            ->with('user')
            ->get();
    }

    public function getAvailableEmployeesProperty(): Collection
    {
        $userIds = \App\Models\User::on('mysql')
            ->where('name', 'like', '%' . $this->search . '%')
            ->pluck('id');

        return Employee::query()
            ->whereIn('user_id', $userIds)
            ->whereDoesntHave('teams', function ($query) {
                $query->where('teams.id', $this->teamId);
            })
            ->with('user')
            ->get();
    }

    public function addSelectedEmployees(): void
    {
        $team = Team::findOrFail($this->teamId);
        $team->employees()->attach($this->selectedEmployees);

        $this->selectedEmployees = [];


        $this->dispatch('close-modal');
        $this->dispatch('refreshTeamEmployees');
        $this->dispatch('alert', type: 'success', message: 'Colaborador adicionado com sucesso!');

    }

    public function removeEmployee(int $employeeId): void
    {
        Team::findOrFail($this->teamId)->employees()->detach($employeeId);

        $this->dispatch('refreshTeamEmployees');
        $this->dispatch('alert', type: 'danger', message: 'Colaborador removido com sucesso!!');
    }

    public function render()
    {
        return view('Administration::livewire.team-employees', [
            'employees' => $this->employees,
            'availableEmployees' => $this->availableEmployees,
        ]);
    }
}
