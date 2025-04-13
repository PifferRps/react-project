import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Icon } from '@/components/ui/icon';
import { Edit, Trash2, MoreVertical } from 'lucide-react';

interface Props {
    editUrl?: string;
    deleteUrl?: string;
    additionalItems?: React.ReactNode;
}

export default function ActionsDropdown({ editUrl, deleteUrl, additionalItems }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="text-gray-600 hover:text-gray-800 text-lg px-2 py-1 rounded-md focus:outline-none"
            >
                <Icon iconNode={MoreVertical} className="w-5 h-5" />
            </button>

            {open && (
                <div className="z-10 absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {additionalItems}

                        {editUrl && (
                            <li>
                                <Link
                                    href={editUrl}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <Icon iconNode={Edit} className="text-yellow-500 mr-2" /> Editar
                                </Link>
                            </li>
                        )}

                        {deleteUrl && (
                            <li>
                                <Link
                                    href={deleteUrl}
                                    method="delete"
                                    as="button"
                                    className="w-full flex items-center px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-red-600"
                                    onClick={(e) => {
                                        if (!confirm('Tem certeza que deseja excluir?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <Icon iconNode={Trash2} className="text-red-600 mr-2" /> Excluir
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
