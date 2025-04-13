import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import EmployeeForm from './EmployeeForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
    { title: 'Editar', href: '#' },
];

export default function Edit() {
    const { employee } = usePage().props as { employee: any };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Colaborador" />

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                    <i className="fas fa-user-edit text-indigo-500"></i>
                    Editar Colaborador
                </h2>

                <EmployeeForm
                    method="put"
                    action={route('admin.employees.update', employee.id)}
                    employee={employee}
                    buttonLabel="Salvar"
                />
            </div>
        </AppLayout>
    );
}
