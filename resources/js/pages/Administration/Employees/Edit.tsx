import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import EmployeeForm from './EmployeeForm';
import FormCard from '@/components/form/FormCard';

interface EditEmployeePageProps extends Record<string, unknown> {
    employee: {
        id: number;
        user?: {
            name?: string;
            email?: string;
        };
        city?: string;
        active: boolean;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
    { title: 'Editar', href: '#' },
];

export default function Edit() {
    const { employee } = usePage<EditEmployeePageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Colaborador" />
            <FormCard title="Editar Colaborador" icon={<i className="fas fa-user-edit text-indigo-500"></i>}>
                <EmployeeForm method="put" action={route('admin.employees.update', employee.id)} employee={employee} buttonLabel="Salvar" />
            </FormCard>
        </AppLayout>
    );
}
