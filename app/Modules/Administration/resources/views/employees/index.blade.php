@extends('layouts.app')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Dashboard', 'url' => route('dashboard')], ['label' => 'Colaboradores']]"/>
@endsection

@section('content')
    <x-listing-card title="Colaboradores">
        <x-slot:search>
            <input type="text" placeholder="Buscar colaborador..."
                   class="block w-full md:w-64 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500">

        </x-slot:search>

        <x-slot:action>
            <a href="{{ route('admin.employees.create') }}"
               class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <i class="fas fa-user-plus mr-2"></i> Adicionar
            </a>
        </x-slot:action>

        @foreach ($employees as $employee)
            <li>
                <div class="flex justify-between items-center p-2 relative">
                    <!-- Coluna da esquerda -->
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="shrink-0">
                            <div
                                    class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200">
                                {{ strtoupper(substr($employee->user->name ?? '??', 0, 2)) }}
                            </div>
                        </div>
                        <div class="min-w-0">
                            <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                                {{ $employee->user->name ?? 'Sem nome' }}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {{ $employee->user->email ?? 'Sem e-mail' }}
                            </p>
                            <p class="text-sm text-gray-400">
                                {{ $employee->city ?? '-' }}
                            </p>
                        </div>
                    </div>

                    <!-- Coluna da direita (badge + ações) -->
                    <div class="flex items-center gap-3">
                        @if($employee->active)
                            <span
                                    class="inline-flex items-center rounded-md bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                                Ativo
                            </span>
                        @else
                            <span
                                    class="inline-flex items-center rounded-md bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                                Inativo
                                </span>
                        @endif

                        <x-table.actions
                                :editUrl="route('admin.employees.edit', $employee)"
                                :deleteUrl="route('admin.employees.destroy', $employee)"
                        >
                        </x-table.actions>
                    </div>
                </div>
            </li>
        @endforeach

        <x-slot:pagination>
            {{ $employees->links() }}
        </x-slot:pagination>

    </x-listing-card>
@endsection
