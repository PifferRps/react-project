<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class ModuleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        $modules = glob(app_path('Modules/*'), GLOB_ONLYDIR);

        foreach ($modules as $module) {
            $moduleName = basename($module);

            // Carrega views e migrations
            $this->loadViewsFrom("$module/resources/views", strtolower($moduleName));

            $this->loadMigrationsFrom("$module/database/migrations");

            // Carrega rotas do módulo como rotas de tenant
            Route::middleware(['web', 'auth', 'tenant'])
                ->group("$module/routes.php");
        }
    }
}
