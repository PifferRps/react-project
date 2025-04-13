// components/form/InputText.tsx
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
    name: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    required?: boolean;
    error?: string;
    className?: string;
}

export default function InputText({
                                      name,
                                      label,
                                      value,
                                      onChange,
                                      type = 'text',
                                      required,
                                      error,
                                      className = '',
                                  }: Props) {
    return (
        <div className={`space-y-1 ${className}`}>
            <Label htmlFor={name}>{label}</Label>
            <Input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                aria-invalid={!!error}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
