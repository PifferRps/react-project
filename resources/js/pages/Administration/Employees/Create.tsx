import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import EmployeeForm from './EmployeeForm';
import FormCard from '@/components/form/FormCard';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
    { title: 'Cadastrar', href: '#' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Colaboradores" />
            <FormCard
                title="Cadastro de Colaboradores"
                icon={<i className="fas fa-user-plus text-indigo-500"></i>}
            >
                <EmployeeForm
                    method="post"
                    action={route('admin.employees.store')}
                    buttonLabel="Criar"
                />
            </FormCard>
        </AppLayout>
    );
}
