import { Link } from '@inertiajs/react';

interface ListingCardProps {
    title: string;
    addButton?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    };
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    headers: string[];
    children: React.ReactNode;
    pagination?: {
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function ListingCard({
                                        title,
                                        addButton,
                                        searchPlaceholder = 'Buscar...',
                                        searchValue,
                                        onSearchChange,
                                        headers,
                                        children,
                                        pagination,
                                    }: ListingCardProps) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
            {/* Cabeçalho */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">{title}</h1>
                    {addButton && (
                        <Link
                            href={addButton.href}
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            {addButton.icon}
                            {addButton.label}
                        </Link>
                    )}
                </div>

                {/* Busca */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchValue}
                        onChange={(e) => onSearchChange?.(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500 md:w-80"
                    />
                </div>

                {/* Tabela */}
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="p-4">
                            <input type="checkbox" className="w-4 h-4 rounded-sm text-blue-600 border-gray-300 dark:bg-gray-700 dark:border-gray-600" />
                        </th>
                        {headers.map((header, idx) => (
                            <th key={idx} className="px-6 py-3">{header}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>

                {/* Paginação */}
                {pagination && (
                    <div className="flex justify-center mt-4 space-x-2">
                        {pagination.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded-md text-sm ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}
