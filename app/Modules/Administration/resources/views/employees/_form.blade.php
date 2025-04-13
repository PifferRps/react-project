<form wire:submit.prevent="{{ $action }}">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <x-form.input-text label="Nome Completo" name="form.name" wire:model.defer="form.name" required/>
        <x-form.input-text label="E-mail" name="form.email" type="email" wire:model.defer="form.email" required/>
        <x-form.input-mask label="CPF" name="form.cpf" mask="000.000.000-00" wire:model.defer="form.cpf" required/>
        <x-form.input-mask label="Telefone" name="form.phone" mask="(00) 00000-0000" wire:model.defer="form.phone"/>
        <x-form.input-date label="Data de Admissão" name="form.hire_date" wire:model.defer="form.hire_date"/>
        <x-form.input-date label="Data de Demissão" name="form.termination_date"
                           wire:model.defer="form.termination_date"/>
        <x-form.input-mask label="CEP" name="form.postal_code" mask="00000-000" wire:model.defer="form.postal_code"/>
        <x-form.input-text label="Cidade" name="form.city" wire:model.defer="form.city"/>
        <x-form.input-text label="Endereço" name="form.street_address" wire:model.defer="form.street_address"
                           class="md:col-span-2"/>
        <x-form.input-text label="Bairro" name="form.neighborhood" wire:model.defer="form.neighborhood"
                           class="md:col-span-2"/>
        <x-form.input-text label="Senha" name="form.password" type="password" wire:model.defer="form.password"/>
        <x-form.input-text label="Confirmar Senha" name="form.password_confirmation" type="password"
                           wire:model.defer="form.password_confirmation"/>
    </div>

    <div class="mt-6 flex justify-end">
        <x-form.button-submit>{{ $buttonLabel ?? 'Salvar' }}</x-form.button-submit>
    </div>
</form>
