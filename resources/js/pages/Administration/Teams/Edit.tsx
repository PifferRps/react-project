import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import TeamForm from './TeamForm';
import { Users2 } from 'lucide-react';
import TabsNav from '@/components/tabs/TabsNav';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Equipes', href: '/admin/teams' },
    { title: 'Editar', href: '#' },
];

export default function Edit() {
    const { team } = usePage().props as { team: any };

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
            <Head title="Editar Equipe" />

            {/* Abas no topo */}
            <TabsNav tabs={tabs} className="mb-4" />

            {/* Formulário da equipe */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                    <Users2 className="text-indigo-500 w-5 h-5" />
                    Editar Equipe
                </h2>

                <TeamForm
                    method="put"
                    action={route('admin.teams.update', team.id)}
                    team={team}
                    buttonLabel="Salvar"
                />
            </div>
        </AppLayout>
    );
}
