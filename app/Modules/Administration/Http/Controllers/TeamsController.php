<?php

namespace App\Modules\Administration\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Administration\Http\Requests\TeamsRequest;
use App\Modules\Administration\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class TeamsController extends Controller
{
    public function index(): View
    {
        $teams = Team::latest()->paginate(10);

        return view('Administration::teams.index', compact('teams'));
    }

    public function create(): View
    {
        return view('Administration::teams.create');
    }

    public function store(TeamsRequest $request): RedirectResponse
    {
        Team::create($request->validated());

        return redirect()
            ->route('admin.teams.index')
            ->with('success', 'Equipe criada com sucesso!');
    }

    public function edit(int $id): View
    {
        $team = Team::findOrFail($id);

        return view('Administration::teams.edit', compact('team'));
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

    public function colaboradores(int $id): View
    {
        $team = Team::findOrFail($id);
        return view('Administration::teams.employees', compact('team'));
    }
}
