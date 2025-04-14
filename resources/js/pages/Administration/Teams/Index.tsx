import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import ActionsDropdown from '@/components/table/ActionsDropdown';
import { Users, Users2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Administrativo', href: '/dashboard' },
    { title: 'Equipes', href: route('admin.teams.index') },
];

export default function Index() {
    const { teams } = usePage().props as {
        teams: {
            data: any[];
            links: any[];
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipes" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Equipes</h1>

                    <Link
                        href={route('admin.teams.create')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Adicionar
                    </Link>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="block w-full md:w-64 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <ul className="space-y-2">
                    {teams.data.map((team) => (
                        <li key={team.id}>
                            <div className="flex justify-between items-center p-2 rounded bg-white shadow">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-white">
                                            {team.name || 'Sem nome'}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {team.description || ''}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-sm font-medium ${
                      team.active
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {team.active ? 'Ativo' : 'Inativo'}
                  </span>

                                    <ActionsDropdown
                                        editUrl={route('admin.teams.edit', team.id)}
                                        deleteUrl={route('admin.teams.destroy', team.id)}
                                        additionalItems={
                                            <li>
                                                <Link
                                                    href={route('admin.teams.employees', team.id)}
                                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                >
                                                    <Users2 className="h-4 w-4 mr-2 text-blue-500" />
                                                    Adicionar Colaborador
                                                </Link>
                                            </li>
                                        }
                                    />
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <div className="flex justify-center space-x-2">
                        {teams.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded-md text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
