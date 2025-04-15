import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import IndicatorForm from './IndicatorForm';
import FormCard from '@/components/form/FormCard';

interface EditIndicatorPageProps extends Record<string, unknown> {
    indicator: {
        id: number;
        name?: string;
        description?: string;
        weight?: number | string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Indicadores', href: '/admin/indicators' },
    { title: 'Editar', href: '#' }
];

export default function Edit() {
    const { indicator } = usePage<EditIndicatorPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <FormCard title="Editar Indicador">
                <IndicatorForm
                    method="put"
                    action={route('admin.indicators.update', indicator.id)}
                    indicator={indicator}
                    buttonLabel="Salvar"
                />
            </FormCard>
        </AppLayout>
    );
}
