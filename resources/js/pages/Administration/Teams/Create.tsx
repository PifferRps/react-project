import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import TeamForm from './TeamForm';
import FormCard from '@/components/form/FormCard';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Listagem', href: route('admin.teams.index') },
    { title: 'Equipes', href: route('admin.teams.create') },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FormCard title="Cadastro de Equipes">
                <TeamForm
                    method="post"
                    action={route('admin.teams.store')}
                    buttonLabel="Criar"
                />

                <div className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800 mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Sem colaboradores ainda.
                    </p>
                </div>
            </FormCard>
        </AppLayout>
    );
}
