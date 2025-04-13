<x-base-form title="Cadastro de Colaboradores">
    @include('administration::employees._form', [
        'action' => 'save',
        'method' => 'POST',
        'employee' => null,
        'isLivewire' => true,
        'buttonLabel' => 'Criar'
    ])
</x-base-form>
