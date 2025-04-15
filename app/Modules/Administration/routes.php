<?php

use App\Modules\Administration\Http\Controllers\EmployeesController;
use App\Modules\Administration\Http\Controllers\IndicatorsController;
use App\Modules\Administration\Http\Controllers\TeamsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'tenant', 'verified'])->prefix('administracao')->as('admin.')->group(function () {

    // CRUD de colaboradores
    Route::resource('colaborador', EmployeesController::class)
        ->names('employees')
        ->parameters(['colaborador' => 'employee']);

    // CRUD de equipes
    Route::resource('equipes', TeamsController::class)
        ->names('teams')
        ->parameters(['equipes' => 'team']);
    Route::get('equipes/{team}/colaboradores', [TeamsController::class, 'colaboradores'])
        ->name('teams.employees');
    Route::post('equipes/{team}/colaboradores/adicionar', [TeamsController::class, 'addEmployees'])
        ->name('teams.employees.add');
    Route::post('equipes/{team}/colaboradores/{employee}/remover', [TeamsController::class, 'removeEmployee'])
        ->name('teams.employees.remove');

    // CRUD de Indicadores
    Route::resource('indicadores', IndicatorsController::class)
        ->names('indicators')
        ->parameters(['indicador' => 'indicator']);
});
