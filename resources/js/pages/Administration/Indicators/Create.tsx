import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import IndicatorForm from './IndicatorForm';
import FormCard from '@/components/form/FormCard';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Colaboradores', href: '/admin/employees' },
    { title: 'Cadastrar', href: '#' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FormCard
                title="Cadastro de Indicadores"
            >
                <IndicatorForm
                    method="post"
                    action={route('admin.indicators.store')}
                    buttonLabel="Criar"
                />
            </FormCard>
        </AppLayout>
    );
}
