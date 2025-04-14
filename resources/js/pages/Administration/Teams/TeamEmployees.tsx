import Modal from '@/components/modal/TeamEmployeesModal';
import TabsNav from '@/components/tabs/TabsNav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Trash2, Users2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/icon';

interface User {
    name?: string;
    email?: string;
}

interface Employee {
    id: number;
    user?: User;
    active: boolean;
    city?: string;
}

interface Team {
    id: number;
}

// Props da página
interface TeamEmployeesPageProps extends Record<string, unknown> {
    team: Team;
    employees: Employee[];
    availableEmployees: Employee[];
}

interface FlashType {
    success?: string;
    error?: string;
    danger?: string;
    info?: string;
    warning?: string;
    dark?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Equipes', href: '/admin/teams' },
    { title: 'Colaboradores', href: '#' },
];

export default function TeamEmployees() {
    const { team, employees, availableEmployees } =
        usePage<TeamEmployeesPageProps>().props;

    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number[]>([]);
    const [localFlash, setLocalFlash] = useState<FlashType>({});

    // Função para atualizar o estado de flash
    function setFlash(newFlash: FlashType) {
        setLocalFlash((prev) => ({ ...prev, ...newFlash }));
    }

    // Efeito para limpar a mensagem danger após 5 segundos
    useEffect(() => {
        if (localFlash.danger) {
            const timer = setTimeout(() => {
                setLocalFlash((prev) => ({ ...prev, danger: undefined }));
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [localFlash.danger]);

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

            {/* Alerta local de danger */}
            {localFlash.danger && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Danger</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {localFlash.danger}
                    </div>
                    <button
                        onClick={() =>
                            setLocalFlash((prev) => ({ ...prev, danger: undefined }))
                        }
                        className="absolute top-2 right-2 text-red-800 hover:text-red-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-white">
                        <Users2 className="h-5 w-5 text-indigo-500" />
                        Colaboradores na Equipe
                    </h2>
                    <Button onClick={() => setModalOpen(true)}>
                        Adicionar colaboradores
                    </Button>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {employees.length === 0 && (
                        <li className="px-2 py-3 text-gray-500">
                            Sem colaboradores ainda.
                        </li>
                    )}
                    {employees.map((employee) => (
                        <li key={employee.id} className="py-3">
                            <div className="flex items-center justify-between px-2">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                                        {employee.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div>
                                        <p className="truncate text-base font-medium text-gray-900 dark:text-white">
                                            {employee.user?.name || 'Sem nome'}
                                        </p>
                                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                            {employee.user?.email || 'Sem e-mail'}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {employee.city || '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                  <span
                      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${
                          employee.active
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}
                  >
                    {employee.active ? 'Ativo' : 'Inativo'}
                  </span>

                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => {
                                            if (
                                                confirm(
                                                    'Tem certeza que deseja remover este colaborador?'
                                                )
                                            ) {
                                                router.post(
                                                    route('admin.teams.employees.remove', {
                                                        team: team.id,
                                                        employee: employee.id,
                                                    }),
                                                    {},
                                                    {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            // Atualiza a mensagem flash local "danger" para exibir o alerta
                                                            setFlash({
                                                                danger: 'Colaborador removido com sucesso!',
                                                            });
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

            {/* Modal para adicionar colaboradores */}
            <Modal
                title="Adicionar colaboradores"
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Input
                    placeholder="Buscar colaboradores..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mb-4"
                />

                <ul className="max-h-64 divide-y divide-gray-200 overflow-y-auto dark:divide-gray-600">
                    {availableEmployees
                        .filter((e) =>
                            e.user?.name?.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((employee) => (
                            <li key={employee.id} className="flex items-center gap-3 py-2">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(employee.id)}
                                    onChange={() => toggleSelection(employee.id)}
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-sm font-bold text-gray-700 dark:bg-gray-600 dark:text-gray-200">
                                        {employee.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {employee.user?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {employee.user?.email}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>

                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setModalOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => {
                            if (selected.length === 0) return;

                            router.post(
                                route('admin.teams.employees.add', team.id),
                                { employees: selected },
                                {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        setSelected([]);
                                        setModalOpen(false);
                                    },
                                }
                            );
                        }}
                    >
                        Adicionar
                    </Button>
                </div>
            </Modal>
        </AppLayout>
    );
}
