import React from 'react';

interface Props {
    label: string;
    name: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

export default function InputText({
                                      label,
                                      name,
                                      value,
                                      onChange,
                                      type = 'text',
                                      required = false,
                                      error,
                                      className = '',
                                  }: Props) {
    return (
        <div className={className}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
