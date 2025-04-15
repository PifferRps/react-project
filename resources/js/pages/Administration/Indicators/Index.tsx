import ActionsDropdown from '@/components/table/ActionsDropdown';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, router, Link } from '@inertiajs/react';
import { useState } from 'react';
import ListingCard from '@/components/form/ListingCard';
import ListingItemRow from '@/components/form/ListingItemRow';

interface Indicator {
    id: number;
    name?: string;
    description?: string;
    city?: string;
    active: boolean;
}

interface IndicatorsPageProps extends Record<string, unknown> {
    indicators: {
        data: Indicator[];
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
    { title: 'Indicadores', href: '/admin/indicadores' }
];

export default function Index() {
    const { indicators, filters } = usePage<IndicatorsPageProps>().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchChange = (value: string) => {
        setSearch(value);
        router.get(
            route('admin.indicators.index'),
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    const getStatusStyle = (active: boolean) =>
        active
            ? 'rounded bg-green-100 px-2 py-0.5 text-green-800 dark:bg-green-900 dark:text-green-300'
            : 'rounded bg-red-100 px-2 py-0.5 text-red-800 dark:bg-red-900 dark:text-red-300';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Indicadores" />

            <ListingCard
                title="Indicadores"
                addButton={{ label: 'Adicionar', href: route('admin.indicators.create') }}
                headers={['Nome', 'Cidade', 'Status', 'Ações']}
                searchValue={search}
                onSearchChange={handleSearchChange}
                pagination={{ links: indicators.links }}
            >
                {indicators.data.map((indicator) => (
                    <ListingItemRow
                        key={indicator.id}
                        title={indicator.name ?? 'Sem nome'}
                        columns={[
                            <span key="desc">{indicator.description || '-'}</span>
                        ]}
                        status={
                            <span className={getStatusStyle(indicator.active)}>
                             {indicator.active ? 'Ativo' : 'Inativo'}
                            </span>
                        }
                        actions={
                            <ActionsDropdown
                                editUrl={route('admin.indicators.edit', indicator.id)}
                                deleteUrl={route('admin.indicators.destroy', indicator.id)}
                            />
                        }
                    />
                ))}
            </ListingCard>
        </AppLayout>
    );
}
