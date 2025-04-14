import React from 'react';

export interface FormCardProps {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export default function FormCard({ title, icon, children }: FormCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
                {icon && icon}
                {title}
            </h2>
            {children}
        </div>
    );
}
