import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import TeamForm from './TeamForm';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Listagem', href: route('admin.teams.index') },
    { title: 'Equipes', href: route('admin.teams.create') },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cadastro de Equipes" />

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                    Cadastro de Equipes
                </h2>

                <TeamForm
                    method="post"
                    action={route('admin.teams.store')}
                    buttonLabel="Criar"
                />

                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Sem colaboradores ainda.</p>
                </div>
            </div>
        </AppLayout>
    );
}
