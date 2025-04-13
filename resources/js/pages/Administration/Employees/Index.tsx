import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
];

export default function Index() {
    const { employees } = usePage().props as {
        employees: {
            data: any[];
            links: any[];
        };
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colaboradores" />

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Colaboradores</h1>

                    <Link
                        href={route('admin.employees.create')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    >
                        <i className="fas fa-user-plus mr-2" /> Adicionar
                    </Link>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar colaborador..."
                        className="block w-full md:w-64 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <ul className="space-y-2">
                    {employees.data.map((employee) => (
                        <li key={employee.id}>
                            <div className="flex justify-between items-center p-2 rounded bg-white shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-700 dark:text-gray-200">
                                        {employee.user?.name?.substring(0, 2).toUpperCase() || '??'}
                                    </div>
                                    <div>
                                        <p className="text-base font-medium text-gray-900 dark:text-white">
                                            {employee.user?.name || 'Sem nome'}
                                        </p>
                                        <p className="text-sm text-gray-500">
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

                                    <div className="flex gap-2">
                                        <Link href={route('admin.employees.edit', employee.id)} title="Editar">
                                            <i className="fas fa-pen text-blue-500 hover:text-blue-700" />
                                        </Link>
                                        <Link
                                            href={route('admin.employees.destroy', employee.id)}
                                            method="delete"
                                            as="button"
                                            className="text-red-500 hover:text-red-700"
                                            title="Excluir"
                                        >
                                            <i className="fas fa-trash" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-4">
                    <div className="flex justify-center space-x-2">
                        {employees.links.map((link, index) => (
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
