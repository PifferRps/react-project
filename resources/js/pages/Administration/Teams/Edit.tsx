import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import TeamForm from './TeamForm';
import { Users2 } from 'lucide-react';
import TabsNav from '@/components/tabs/TabsNav';
import FormCard from '@/components/form/FormCard';

interface EditTeamPageProps extends Record<string, unknown> {
    team: {
        id: number;
        name?: string;
        description?: string;
        active: boolean;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Equipes', href: '/admin/teams' },
    { title: 'Editar', href: '#' },
];

export default function Edit() {

    const { team } = usePage<EditTeamPageProps>().props;

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

            {/* Abas para a navegação específica da tela de equipe */}
            <TabsNav tabs={tabs} className="mb-4" />

            <FormCard
                title="Editar Equipe"
                icon={<Users2 className="text-indigo-500 w-5 h-5" />}
            >
                <TeamForm
                    method="put"
                    action={route('admin.teams.update', team.id)}
                    team={team}
                    buttonLabel="Salvar"
                />
            </FormCard>
        </AppLayout>
    );
}
