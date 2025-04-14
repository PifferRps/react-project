import ActionsDropdown from '@/components/table/ActionsDropdown';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ListingCard from '@/components/form/ListingCard';
import ListingItemRow from '@/components/form/ListingItemRow';

interface Employee {
    id: number;
    user?: {
        name?: string;
        email?: string;
    };
    city?: string;
    active: boolean;
}

interface EmployeesPageProps extends Record<string, unknown> {
    employees: {
        data: Employee[];
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filters: {
        search: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
];

export default function Index() {
    const { employees, filters } = usePage<EmployeesPageProps>().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchChange = (value: string) => {
        setSearch(value);
        router.get(route('admin.employees.index'), { search: value }, {
            preserveState: true,
            replace: true,
        });
    };

    const getStatusStyle = (active: boolean) =>
        active
            ? 'rounded bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'rounded bg-red-100 px-2 py-0.5 text-red-800 dark:bg-red-900 dark:text-red-300';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Colaboradores" />
            <ListingCard
                title="Colaboradores"
                addButton={{ label: 'Adicionar', href: route('admin.employees.create') }}
                headers={['Nome', 'Cidade', 'Status', 'Ações']}
                searchValue={search}
                onSearchChange={handleSearchChange}
                pagination={{ links: employees.links }}
            >
                {employees.data.map((employee) => (
                    <ListingItemRow
                        key={employee.id}
                        avatar={employee.user?.name?.substring(0, 2).toUpperCase()}
                        title={employee.user?.name ?? 'Sem nome'}
                        subtitle={employee.user?.email}
                        columns={[<span key="cidade">{employee.city || '-'}</span>]}
                        status={
                            <span className={getStatusStyle(employee.active)}>
                {employee.active ? 'Ativo' : 'Inativo'}
              </span>
                        }
                        actions={
                            <ActionsDropdown
                                editUrl={route('admin.employees.edit', employee.id)}
                                deleteUrl={route('admin.employees.destroy', employee.id)}
                            />
                        }
                    />
                ))}
            </ListingCard>
        </AppLayout>
    );
}
