@extends('layouts.app')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Listagem', 'url' => route('admin.teams.index')], ['label' => 'Editar']]"/>
@endsection

@section('content')
    <x-base-form title="Cadastro de Equipes">
        <x-slot:tabs>
            <x-tabs.default id="team-tabs" :tabs="[
            ['id' => 'edit', 'label' => 'Editar Equipe', 'url' => route('admin.teams.edit', $team)],
            ['id' => 'add', 'label' => 'Adicionar Colaboradores', 'url' => route('admin.teams.employees', $team)],
        ]"/>
        </x-slot:tabs>

        @include('Administration::teams._form', [
            'action' => route('admin.teams.update', $team),
            'method' => 'PUT',
            'employee' => $team,
            'buttonLabel' => 'Salvar'
        ])
    </x-base-form>

@endsection
