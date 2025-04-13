<form method="POST" action="{{ $action }}">
    @csrf
    @if($method === 'PUT')
        @method('PUT')
    @endif
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <x-form.input-text
            label="Nome da Equipe"
            name="name"
            :value="old('name', $team->name ?? '')"
            maxlength="100"
            required/>
        <x-form.input-text
            label="Descrição"
            name="description"
            type="description"
            :value="old('description', $team->description ?? '')"
            maxlength="150"
            required/>
    </div>

    <div class="mt-6 flex justify-end">
        <x-form.button-submit>{{ $buttonLabel ?? 'Salvar' }}</x-form.button-submit>
    </div>
</form>
