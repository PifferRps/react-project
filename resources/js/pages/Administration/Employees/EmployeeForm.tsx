import React from 'react';
import { useForm } from '@inertiajs/react';
import InputText from '@/components/form/InputText';
import InputMask from '@/components/form/InputMask';
import InputDate from '@/components/form/InputDate';

interface Employee {
    user?: {
        name?: string;
        email?: string;
    };
    cpf?: string;
    phone?: string;
    hire_date?: string;
    termination_date?: string;
    postal_code?: string;
    city?: string;
    street_address?: string;
    neighborhood?: string;
}

interface Props {
    employee?: Employee;
    method: 'post' | 'put';
    action: string;
    buttonLabel?: string;
}

export default function EmployeeForm({ employee, method, action, buttonLabel = 'Salvar' }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: employee?.user?.name || '',
        email: employee?.user?.email || '',
        cpf: employee?.cpf || '',
        phone: employee?.phone || '',
        hire_date: employee?.hire_date || '',
        termination_date: employee?.termination_date || '',
        postal_code: employee?.postal_code || '',
        city: employee?.city || '',
        street_address: employee?.street_address || '',
        neighborhood: employee?.neighborhood || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (method === 'post') {
            post(action)
        } else {
            put(action)
        }
    };

    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputText
                    label="Nome Completo"
                    name="name"
                    value={data.name}
                    onChange={(val) => setData('name', val)}
                    required
                    error={errors.name}
                />
                <InputText
                    label="E-mail"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(val) => setData('email', val)}
                    required
                    error={errors.email}
                />

                <InputMask
                    label="CPF"
                    name="cpf"
                    mask="000.000.000-00"
                    value={data.cpf}
                    onAccept={(val) => setData('cpf', val)}
                    required
                    error={errors.cpf}
                />

                <InputMask
                    label="Telefone"
                    name="phone"
                    mask="(00) 00000-0000"
                    value={data.phone}
                    onAccept={(val) => setData('phone', val)}
                    error={errors.phone}
                />

                <InputDate
                    label="Data de Admissão"
                    name="hire_date"
                    value={data.hire_date}
                    onChange={(val) => setData('hire_date', val)}
                    error={errors.hire_date}
                />

                <InputDate
                    label="Data de Demissão"
                    name="termination_date"
                    value={data.termination_date}
                    onChange={(val) => setData('termination_date', val)}
                    error={errors.termination_date}
                />

                <InputMask
                    label="CEP"
                    name="postal_code"
                    mask="00000-000"
                    value={data.postal_code}
                    onAccept={(val) => setData('postal_code', val)}
                    error={errors.postal_code}
                />

                <InputText
                    label="Cidade"
                    name="city"
                    value={data.city}
                    onChange={(val) => setData('city', val)}
                    error={errors.city}
                />

                <InputText
                    label="Endereço"
                    name="street_address"
                    value={data.street_address}
                    onChange={(val) => setData('street_address', val)}
                    error={errors.street_address}
                    className="md:col-span-2"
                />

                <InputText
                    label="Bairro"
                    name="neighborhood"
                    value={data.neighborhood}
                    onChange={(val) => setData('neighborhood', val)}
                    error={errors.neighborhood}
                    className="md:col-span-2"
                />

                <InputText
                    label="Senha"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={(val) => setData('password', val)}
                    error={errors.password}
                />

                <InputText
                    label="Confirmar Senha"
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={(val) => setData('password_confirmation', val)}
                    error={errors.password_confirmation}
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
