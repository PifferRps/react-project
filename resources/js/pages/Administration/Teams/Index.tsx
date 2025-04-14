import ActionsDropdown from '@/components/table/ActionsDropdown';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Users, Users2 } from 'lucide-react';
import { useState } from 'react';
import ListingCard from '@/components/form/ListingCard';
import ListingItemRow from '@/components/form/ListingItemRow';

interface Team {
    id: number;
    name?: string;
    description?: string;
    active: boolean;
}

interface TeamsPageProps extends Record<string, unknown> {
    teams: {
        data: Team[];
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
    { title: 'Administrativo', href: '/dashboard' },
    { title: 'Equipes', href: route('admin.teams.index') },
];

export default function Index() {
    const { teams, filters } = usePage<TeamsPageProps>().props;
    const [search, setSearch] = useState(filters.search || '');

    const handleSearchChange = (value: string) => {
        setSearch(value);
        router.get(route('admin.teams.index'), { search: value }, {
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
            <Head title="Equipes" />

            <ListingCard
                title="Equipes"
                addButton={{
                    label: 'Adicionar',
                    href: route('admin.teams.create'),
                    icon: <Users className="mr-2 h-4 w-4" />,
                }}
                searchValue={search}
                onSearchChange={handleSearchChange}
                headers={['Nome', 'Descrição', 'Status', 'Ações']}
                pagination={{ links: teams.links }}
            >
                {teams.data.map((team) => (
                    <ListingItemRow
                        key={team.id}
                        title={team.name ?? 'Sem nome'}
                        columns={[<span key="desc">{team.description || '-'}</span>]}
                        status={
                            <span className={getStatusStyle(team.active)}>
                {team.active ? 'Ativo' : 'Inativo'}
              </span>
                        }
                        actions={
                            <ActionsDropdown
                                editUrl={route('admin.teams.edit', team.id)}
                                deleteUrl={route('admin.teams.destroy', team.id)}
                                additionalItems={
                                    <li>
                                        <Link
                                            href={route('admin.teams.employees', team.id)}
                                            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <Users2 className="mr-2 h-4 w-4 text-blue-500" />
                                            Adicionar Colaborador
                                        </Link>
                                    </li>
                                }
                            />
                        }
                    />
                ))}
            </ListingCard>
        </AppLayout>
    );
}
