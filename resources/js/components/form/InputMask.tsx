// components/form/InputMask.tsx
import React from 'react';
import { IMaskInput } from 'react-imask';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface Props {
    name: string;
    label: string;
    mask: string;
    value: string;
    onAccept: (value: string) => void;
    required?: boolean;
    error?: string;
    className?: string;
}

export default function InputMask({
                                      name,
                                      label,
                                      mask,
                                      value,
                                      onAccept,
                                      required,
                                      error,
                                      className = '',
                                  }: Props) {
    return (
        <div className={`space-y-1 ${className}`}>
            <Label htmlFor={name}>{label}</Label>
            <IMaskInput
                id={name}
                name={name}
                mask={mask}
                value={value}
                unmask={true}
                onAccept={onAccept}
                required={required}
                aria-invalid={!!error}
                className={cn(
                    "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className
                )}
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}
