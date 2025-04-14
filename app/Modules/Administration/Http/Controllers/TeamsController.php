<?php

namespace App\Modules\Administration\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Modules\Administration\Http\Requests\TeamsRequest;
use App\Modules\Administration\Models\Employee;
use App\Modules\Administration\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $teams = Team::latest()->when($search, fn($q) =>
        $q->where(function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        })
        )->paginate(10);

        return Inertia::render('Administration/Teams/Index', [
            'teams' => $teams,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Administration/Teams/Create');
    }

    public function store(TeamsRequest $request): RedirectResponse
    {
        Team::create($request->validated());

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Equipe criada com sucesso!');
    }

    public function edit(int $id): Response
    {
        $team = Team::findOrFail($id);

        return Inertia::render('Administration/Teams/Edit', [
            'team' => $team,
        ]);
    }

    public function update(TeamsRequest $request, int $id): RedirectResponse
    {
        $team = Team::findOrFail($id);

        $team->update($request->validated());

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Equipe atualizada com sucesso!');
    }

    public function destroy(int $id): RedirectResponse
    {
        $team = Team::findOrFail($id);

        $team->delete();

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Equipe removida com sucesso!');
    }

    public function colaboradores(int $id): Response
    {
        $team = Team::with('employees.user')->findOrFail($id);

        $employees = $team->employees;

        // Busca de funcionários que ainda não fazem parte da equipe
        $userIds = User::on('mysql')->pluck('id');

        $availableEmployees = Employee::with('user')
            ->whereIn('user_id', $userIds)
            ->whereDoesntHave('teams', fn ($query) => $query->where('teams.id', $team->id))
            ->get();

        return Inertia::render('Administration/Teams/TeamEmployees', [
            'team' => $team,
            'employees' => $employees,
            'availableEmployees' => $availableEmployees,
        ]);
    }


    public function addEmployees(Request $request, $id): RedirectResponse
    {
        $data = $request->validate([
            'employees' => ['required', 'array'],
            'employees.*' => ['integer', 'exists:employees,id'],
        ]);

        $team = Team::findOrFail($id);

        $team->employees()->syncWithoutDetaching($data['employees']);

        return redirect()
            ->route('admin.teams.employees', $team)
            ->with('success', 'Colaboradores adicionados com sucesso!');
    }

    public function removeEmployee(int $teamId, int $employeeId): RedirectResponse
    {
        $team = Team::findOrFail($teamId);

        $team->employees()->detach($employeeId);

        return redirect()
            ->route('admin.teams.employees', $teamId);
    }


}
