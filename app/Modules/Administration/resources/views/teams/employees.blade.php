@extends('layouts.app')

@section('breadcrumb')
    <x-breadcrumb :items="[['label' => 'Listagem', 'url' => route('admin.teams.index')], ['label' => 'Colaborador']]"/>
@endsection

@section('content')
    <x-base-form title="Colaboradores na Equipe">
        <x-slot:tabs>
            <x-tabs.default id="team-tabs" :tabs="[
            ['id' => 'edit', 'label' => 'Editar Equipe', 'url' => route('admin.teams.edit', $team)],
            ['id' => 'add', 'label' => 'Adicionar Colaboradores', 'url' => route('admin.teams.employees', $team)],
        ]"/>
        </x-slot:tabs>
        @livewire('administration.teams-employees-livewire', ['teamId' => $team->id])
    </x-base-form>
@endsection
