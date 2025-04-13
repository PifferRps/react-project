import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import EmployeeForm from './EmployeeForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
    { title: 'Cadastrar', href: '#' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Colaboradores" />

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                    <i className="fas fa-user-plus text-indigo-500"></i>
                    Cadastro de Colaboradores
                </h2>

                <EmployeeForm method="post" action={route('admin.employees.store')} buttonLabel="Criar" />
            </div>
        </AppLayout>
    );
}
