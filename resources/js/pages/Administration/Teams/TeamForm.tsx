import React from 'react';
import { useForm } from '@inertiajs/react';
import InputText from '@/components/form/InputText';

interface Team {
    name?: string;
    description?: string;
}

interface Props {
    team?: Team;
    method: 'post' | 'put';
    action: string;
    buttonLabel?: string;
}

export default function TeamForm({ team, method, action, buttonLabel = 'Salvar' }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: team?.name || '',
        description: team?.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (method === 'post') {
            post(action);
        } else {
            put(action);
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText
                    label="Nome da Equipe"
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
            </div>

            <div className="mt-6 flex justify-end">
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
