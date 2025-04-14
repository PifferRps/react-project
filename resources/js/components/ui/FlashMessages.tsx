import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

interface FlashMessagesProps {
    flash?: {
        success?: string;
        error?: string;
        info?: string;
        warning?: string;
        dark?: string;
    };
}

export default function FlashMessages() {
    const { flash } = usePage().props as FlashMessagesProps;

    const [showSuccess, setShowSuccess] = useState(!!flash?.success);
    const [showError, setShowError] = useState(!!flash?.error);
    const [showInfo, setShowInfo] = useState(!!flash?.info);
    const [showWarning, setShowWarning] = useState(!!flash?.warning);
    const [showDark, setShowDark] = useState(!!flash?.dark);

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    useEffect(() => {
        if (flash?.error) {
            setShowError(true);
            const timer = setTimeout(() => setShowError(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.error]);

    useEffect(() => {
        if (flash?.info) {
            setShowInfo(true);
            const timer = setTimeout(() => setShowInfo(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.info]);

    useEffect(() => {
        if (flash?.warning) {
            setShowWarning(true);
            const timer = setTimeout(() => setShowWarning(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.warning]);

    useEffect(() => {
        if (flash?.dark) {
            setShowDark(true);
            const timer = setTimeout(() => setShowDark(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.dark]);

    if (!showSuccess && !showError && !showInfo && !showWarning && !showDark) return null;

    return (
        <div className="mb-4 space-y-2">
            {showInfo && flash?.info && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {flash.info}
                    </div>
                    <button
                        onClick={() => setShowInfo(false)}
                        className="absolute top-2 right-2 text-blue-800 hover:text-blue-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showError && flash?.error && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Error</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {flash.error}
                    </div>
                    <button
                        onClick={() => setShowError(false)}
                        className="absolute top-2 right-2 text-red-800 hover:text-red-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showSuccess && flash?.success && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Success</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {flash.success}
                    </div>
                    <button
                        onClick={() => setShowSuccess(false)}
                        className="absolute top-2 right-2 text-green-800 hover:text-green-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showWarning && flash?.warning && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Warning</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {flash.warning}
                    </div>
                    <button
                        onClick={() => setShowWarning(false)}
                        className="absolute top-2 right-2 text-yellow-800 hover:text-yellow-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}

            {showDark && flash?.dark && (
                <div
                    className="flex items-center p-4 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 relative"
                    role="alert"
                >
                    <svg
                        className="shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Dark</span>
                    <div>
                        <span className="font-medium">Alerta! </span>
                        {flash.dark}
                    </div>
                    <button
                        onClick={() => setShowDark(false)}
                        className="absolute top-2 right-2 text-gray-800 hover:text-gray-600"
                    >
                        <Icon iconNode={X} className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
