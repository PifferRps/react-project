<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Stancl\Tenancy\TenantManager;

class IdentifyTenant
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (!$user) {
            return $next($request);
        }

        $tenants = $user->tenants ?? [];

        if (empty($tenants)) {
            Auth::logout();
            return redirect()->route('login')->with('error', 'Você não tem empresas associadas.');
        }

        // Já tem tenant na sessão
        if (session()->has('tenant_id')) {
            tenancy()->initialize(session('tenant_id'));
        } else {
            if (count($tenants) === 1) {
                // Apenas um tenant, inicializa e guarda na sessão
                $tenantId = is_array($tenants[0]) ? $tenants[0]['id'] : $tenants[0]->getTenantKey();
                tenancy()->initialize($tenantId);
                session(['tenant_id' => $tenantId]);
            } else {
                // Vários tenants e nenhum selecionado
//                return redirect()->route('tenant.select');
                return redirect();
            }
        }

        return $next($request);
    }

}
