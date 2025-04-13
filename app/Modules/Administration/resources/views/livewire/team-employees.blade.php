<div x-data="{ open: false }" @open-modal.window="open = true" @close-modal.window="open = false">

    <div class="flex justify-end items-center mb-4">
        <button type="button"
                class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                @click="open = true">
            Adicionar colaboradores
        </button>
    </div>
    <ul class="divide-y divide-gray-200 dark:divide-gray-700">
        @forelse($employees as $employee)
            <li class="py-3">
                <div class="flex justify-between items-center px-2">
                    <!-- Coluna da esquerda -->
                    <div class="flex items-center gap-4">
                        <div
                            class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200">
                            {{ strtoupper(substr($employee->user->name ?? '??', 0, 2)) }}
                        </div>
                        <div>
                            <p class="text-base font-medium text-gray-900 dark:text-white truncate">
                                {{ $employee->user->name ?? 'Sem nome' }}
                            </p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                                {{ $employee->user->email ?? 'Sem e-mail' }}
                            </p>
                            <p class="text-sm text-gray-400">
                                {{ $employee->city ?? '-' }}
                            </p>
                        </div>
                    </div>

                    <!-- Coluna da direita -->
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

                        <div x-data="{ confirming: false }" class="relative">
                            <!-- Ícone de lixeira -->
                            <button @click="confirming = true"
                                    class="text-red-600 hover:text-red-800 text-lg"
                                    title="Remover colaborador">
                                <i class="fas fa-trash-alt"></i>
                            </button>

                            <!-- Confirmação inline -->
                            <div x-show="confirming"
                                 x-transition
                                 class="absolute z-50 mt-2 right-0 w-64 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow p-4">
                                <p class="text-sm text-gray-800 dark:text-gray-200 mb-4">
                                    Tem certeza que deseja remover este colaborador?
                                </p>

                                <div class="flex justify-end gap-2">
                                    <button @click="confirming = false"
                                            class="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-100">
                                        Cancelar
                                    </button>
                                    <button @click="$wire.removeEmployee({{ $employee->id }}); confirming = false"
                                            class="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white">
                                        Confirmar
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </li>
        @empty
            <li class="py-3 px-2 text-gray-500">Sem colaboradores ainda.</li>
        @endforelse
    </ul>

    <!-- Modal controlado pelo Alpine -->
    <div x-show="open"
         x-transition
         class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-black/50 w-full h-full">
        <div class="w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Adicionar colaboradores</h3>
                <button type="button"
                        class="text-gray-400 hover:text-gray-900"
                        @click="open = false">✕
                </button>
            </div>

            <div class="p-4 space-y-4">
                <input type="text"
                       wire:model.live.debounce.300ms="search"
                       placeholder="Buscar colaboradores..."
                       class="w-full rounded-md border-gray-300 px-4 py-2"/>

                <ul class="max-h-48 overflow-y-auto divide-y">
                    @forelse($availableEmployees as $employee)
                        <li class="flex items-center gap-3 py-2">
                            <!-- Checkbox -->
                            <input type="checkbox"
                                   wire:model="selectedEmployees"
                                   value="{{ $employee->id }}"
                                   class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500">

                            <!-- Avatar + Info -->
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 text-sm">
                                    {{ strtoupper(substr($employee->user->name ?? '??', 0, 2)) }}
                                </div>
                                <div class="text-sm">
                                    <p class="text-gray-900 dark:text-white font-medium">{{ $employee->user->name }}</p>
                                    <p class="text-gray-500 dark:text-gray-400 text-xs">{{ $employee->user->email }}</p>
                                </div>
                            </div>
                        </li>
                    @empty
                        <li class="text-gray-500 py-2">Nenhum colaborador encontrado.</li>
                    @endforelse
                </ul>

                <div class="mt-4 flex justify-end gap-2">
                    <button type="button"
                            @click="open = false"
                            class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
                        Cancelar
                    </button>
                    <button type="button"
                            wire:click="addSelectedEmployees"
                            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
