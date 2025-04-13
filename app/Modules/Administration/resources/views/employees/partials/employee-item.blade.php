<li class="flex justify-between items-center p-2">
    <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold">
            {{ strtoupper(substr($item->user->name ?? '??', 0, 2)) }}
        </div>
        <div>
            <p class="text-base font-medium">{{ $item->user->name }}</p>
            <p class="text-sm text-gray-500">{{ $item->user->email }}</p>
            <p class="text-sm text-gray-400">{{ $item->city ?? '-' }}</p>
        </div>
    </div>
    <div class="flex gap-3">
        <span class="inline-flex items-center rounded-md px-2 py-1 text-sm font-medium
            {{ $item->active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
            {{ $item->active ? 'Ativo' : 'Inativo' }}
        </span>
        <x-table.actions
            :edit="route('admin.employees.edit', $item)"
            wireClickDelete="delete({{ $item->id }})"
        />

    </div>
</li>
