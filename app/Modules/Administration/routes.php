<?php

use App\Modules\Administration\Http\Controllers\EmployeesController;
use App\Modules\Administration\Http\Controllers\TeamsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['web', 'auth', 'tenant','verified'])->prefix('administracao')->as('admin.')->group(function () {

    Route::resource('colaborador', EmployeesController::class)
        ->names('employees')
        ->parameters(['colaborador' => 'employee']);

    Route::resource('equipes', TeamsController::class)
        ->names('teams')
        ->parameters(['equipes' => 'team']);

    Route::get('equipes/{team}/colaboradores', [TeamsController::class, 'colaboradores'])
        ->name('teams.employees');

});
