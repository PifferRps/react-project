import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

export default function FlashMessages() {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };

    const [showSuccess, setShowSuccess] = useState(!!flash?.success);
    const [showError, setShowError] = useState(!!flash?.error);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timeout = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const timeout = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [flash?.error]);

    if (!showSuccess && !showError) return null;

    return (
        <div className="mb-4 space-y-2">
            {showSuccess && (
                <div
                    className="flex items-start p-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 w-4 h-4 mt-0.5 me-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>
                        <span className="font-medium">Sucesso!</span> {flash.success}
                    </div>
                    <button
                        onClick={() => setShowSuccess(false)}
                        className="absolute top-2 right-2 text-green-800 hover:text-green-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showError && (
                <div
                    className="flex items-start p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 w-4 h-4 mt-0.5 me-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>
                        <span className="font-medium">Erro!</span> {flash.error}
                    </div>
                    <button
                        onClick={() => setShowError(false)}
                        className="absolute top-2 right-2 text-red-800 hover:text-red-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
