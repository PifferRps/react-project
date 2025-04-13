<x-base-form title="Editar Colaborador">
    @include('administration::employees._form', [
        'action' => 'save',
        'method' => 'PUT',
        'isLivewire' => true,
        'buttonLabel' => 'Salvar'
    ])
</x-base-form>
