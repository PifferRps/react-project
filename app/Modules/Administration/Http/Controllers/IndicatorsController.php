<?php

namespace App\Modules\Administration\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Administration\Http\Requests\IndicatorsRequest;
use App\Modules\Administration\Models\Indicator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IndicatorsController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');

        $indicators = Indicator::latest()->when($search, fn($q) => $q->where(function ($query) use ($search) {
            $query->where('name', 'like', "%{$search}%");
        })
        )->paginate(10);

        return Inertia::render('Administration/Indicators/Index', [
            'indicators' => $indicators,
            'filters' => ['search' => $search],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Administration/Indicators/Create');
    }

    public function store(IndicatorsRequest $request): RedirectResponse
    {
        Indicator::create($request->validated());

        return redirect()
            ->route('admin.indicators.index')
            ->with('success', 'Indicador criado com sucesso!');
    }

    public function edit(int $id): Response
    {
        $indicator = Indicator::findOrFail($id);

        return Inertia::render('Administration/Indicators/Edit', [
            'indicator' => $indicator,
        ]);
    }

    public function update(IndicatorsRequest $request, int $id): RedirectResponse
    {
        $indicator = Indicator::findOrFail($id);

        $indicator->update($request->validated());

        return redirect()
            ->route('admin.indicators.index')
            ->with('success', 'Indicador atualizado com sucesso!');
    }

    public function destroy(int $id): RedirectResponse
    {
        $indicator = Indicator::findOrFail($id);

        $indicator->delete();

        return redirect()
            ->route('admin.indicators.index')
            ->with('success', 'Indicador removido com sucesso!');
    }

}
