import { usePage } from '@inertiajs/react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Ícone de fechar
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
            const timeout = setTimeout(() => setShowSuccess(false), 3000);
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
        <div className="mb-4 space-y-2 transition-all">
            {showSuccess && (
                <Alert className="flex justify-between items-start border border-green-500 bg-green-50 text-green-800 shadow">
                    <div>
                        <AlertTitle>Sucesso</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </div>
                    <button onClick={() => setShowSuccess(false)} className="p-1">
                        <Icon iconNode={X} className="text-green-800" />
                    </button>
                </Alert>
            )}

            {showError && (
                <Alert variant="destructive" className="flex justify-between items-start border border-red-500 bg-red-50 text-red-800 shadow">
                    <div>
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{flash.error}</AlertDescription>
                    </div>
                    <button onClick={() => setShowError(false)} className="p-1">
                        <Icon iconNode={X} className="text-red-800" />
                    </button>
                </Alert>
            )}
        </div>
    );
}
