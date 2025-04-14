import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import TabsNav from '@/components/tabs/TabsNav';
import { useState } from 'react';
import { Trash2, Users2 } from 'lucide-react';
import Modal from '@/components/modal/TeamEmployeesModal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Equipes', href: '/admin/teams' },
    { title: 'Colaboradores', href: '#' },
];

export default function TeamEmployees() {
    const { team, employees = [], availableEmployees = [] } = usePage().props as {
        team: any;
        employees: any[];
        availableEmployees: any[];
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
        );
    };

    const tabs = [
        {
            id: 'edit',
            label: 'Editar Equipe',
            url: route('admin.teams.edit', team.id),
        },
        {
            id: 'employees',
            label: 'Adicionar Colaboradores',
            url: route('admin.teams.employees', team.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colaboradores da Equipe" />

            {/* Tabs reaproveitáveis */}
            <TabsNav tabs={tabs} className="mb-4" />

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Users2 className="text-indigo-500 w-5 h-5" />
                        Colaboradores na Equipe
                    </h2>
                    <Button onClick={() => setModalOpen(true)}>Adicionar colaboradores</Button>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {employees.length === 0 && (
                        <li className="py-3 px-2 text-gray-500">Sem colaboradores ainda.</li>
                    )}

                    {employees.map((employee) => (
                        <li key={employee.id} className="py-3">
                            <div className="flex justify-between items-center px-2">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200">
                                        {employee.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                                            {employee.user?.name || 'Sem nome'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {employee.user?.email || 'Sem e-mail'}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {employee.city || '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${
                                        employee.active
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    }`}>
                                        {employee.active ? 'Ativo' : 'Inativo'}
                                    </span>

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => {
                                            if (confirm('Tem certeza que deseja remover este colaborador?')) {
                                                router.post(
                                                    route('admin.teams.employees.remove', {
                                                        team: team.id,
                                                        employee: employee.id,
                                                    }),
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            // Opcional: mensagem ou toast
                                                            console.log('Colaborador removido com sucesso!');
                                                        },
                                                    }
                                                );
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            <Modal title="Adicionar colaboradores" open={modalOpen} onClose={() => setModalOpen(false)}>
                <Input
                    placeholder="Buscar colaboradores..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4"
                />

                <ul className="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-600">
                    {availableEmployees
                        .filter(e => e.user?.name?.toLowerCase().includes(search.toLowerCase()))
                        .map((employee) => (
                            <li key={employee.id} className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(employee.id)}
                                    onChange={() => toggleSelection(employee.id)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200 text-sm">
                                        {employee.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div className="text-sm">
                                        <p className="text-gray-900 dark:text-white font-medium">{employee.user?.name}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{employee.user?.email}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>

                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</Button>
                    <Button
                        variant="default"
                        onClick={() => {
                            if (selected.length === 0) return;

                            router.post(route('admin.teams.employees.add', team.id), {
                                employees: selected,
                            }, {
                                preserveScroll: true,
                                onSuccess: () => {
                                    setSelected([]);
                                    setModalOpen(false);
                                },
                            });
                        }}
                    >
                        Adicionar
                    </Button>
                </div>
            </Modal>
        </AppLayout>
    );
}
