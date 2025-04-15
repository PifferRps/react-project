import React from 'react';
import { useForm } from '@inertiajs/react';
import InputText from '@/components/form/InputText';

interface Indicator {
    name?: string;
    description?: string;
    weight?: number | string;
}

interface Props {
    indicator?: Indicator;
    method: 'post' | 'put';
    action: string;
    buttonLabel?: string;
}

export default function IndicatorForm({ indicator, method, action, buttonLabel = 'Salvar' }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: indicator?.name || '',
        description: indicator?.description || '',
        weight: indicator?.weight || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        method === 'post' ? post(action) : put(action);
    };

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText
                    label="Indicador"
                    name="name"
                    value={data.name}
                    onChange={(val) => setData('name', val)}
                    required
                    error={errors.name}
                />
                <InputText
                    label="Descrição"
                    name="description"
                    value={data.description}
                    onChange={(val) => setData('description', val)}
                    required
                    error={errors.description}
                />
                <InputText
                    label="Peso"
                    name="weight"
                    type="number"
                    value={data.weight}
                    onChange={(val) => setData('weight', val)}
                    required
                    error={errors.weight}
                />
            </div>

            <div className="flex justify-end mt-6">
                <button
                    type="submit"
                    disabled={processing}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 mt-4"
                >
                    {buttonLabel}
                </button>
            </div>
        </form>
    );
}
