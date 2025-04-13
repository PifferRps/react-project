import React from 'react';
import { IMaskInput } from 'react-imask';

interface Props {
    label: string;
    name: string;
    value: string;
    onAccept: (value: string) => void;
    required?: boolean;
    error?: string;
    className?: string;
}

export default function InputCurrency({
                                          label,
                                          name,
                                          value,
                                          onAccept,
                                          required = false,
                                          error,
                                          className = '',
                                      }: Props) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <IMaskInput
                id={name}
                mask={Number}
                scale={2}
                radix=","
                thousandsSeparator="."
                mapToRadix={['.']}
                unmask={true}
                value={value}
                onAccept={(val: any) => onAccept(val)}
                required={required}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
