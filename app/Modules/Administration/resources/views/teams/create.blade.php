@extends('layouts.app')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Listagem', 'url' => route('admin.teams.index')], ['label' => 'Equipes']]"/>
@endsection

@section('content')
    <x-base-form title="Cadastro de Equipes">

        @include('Administration::teams._form', [
            'action' => route('admin.teams.store'),
            'method' => 'POST',
            'team' => null,
            'buttonLabel' => 'Criar'
        ])

        <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="relacionados" role="tabpanel"
             aria-labelledby="relacionados-tab">
            <p class="text-sm text-gray-500 dark:text-gray-400">Sem colaboradores ainda. </p>
        </div>
    </x-base-form>

@endsection
