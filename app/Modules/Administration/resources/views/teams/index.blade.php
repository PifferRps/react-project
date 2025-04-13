@extends('layouts.app')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Administrativo', 'url' => route('dashboard')], ['label' => 'Equipes']]"/>
@endsection

@section('content')
    <x-listing-card title="Equipes">
        <x-slot:search>
            <input type="text" placeholder="Buscar..."
                   class="block w-full md:w-64 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500">
        </x-slot:search>

        <x-slot:action>
            <a href="{{ route('admin.teams.create') }}"
               class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                <i class="fas fa-user-plus mr-2"></i> Adicionar
            </a>
        </x-slot:action>

        @foreach ($teams as $team)
            <li>
                <div class="flex justify-between items-center p-2 relative">
                    <!-- Coluna da esquerda -->
                    <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="min-w-0">
                            <p class="text-base font-medium text-gray-900 truncate dark:text-white">
                                {{ $team->name ?? 'Sem nome' }}
                            </p>
                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                {{ $team->description ?? '' }}
                            </p>
                        </div>
                    </div>

                    <!-- Coluna da direita (badge + ações) -->
                    <div class="flex items-center gap-3">
                        @if($team->active)
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
                            :edit="route('admin.teams.edit', $team)"
                            :delete="route('admin.teams.destroy', $team)"
                        >
                            <li>
                                <a href="{{ route('admin.teams.employees', $team) }}"
                                   class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <i class="fas fa-user-plus mr-2 text-blue-500"></i> Adicionar Colaborador
                                </a>
                            </li>
                        </x-table.actions>
                    </div>
                </div>
            </li>
        @endforeach

        <x-slot:pagination>
            {{ $teams->links() }}
        </x-slot:pagination>

    </x-listing-card>
@endsection
