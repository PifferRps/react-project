interface ListingItemRowProps {
    avatar?: React.ReactNode;
    title: string;
    subtitle?: string;
    columns?: React.ReactNode[];
    status?: React.ReactNode;
    actions?: React.ReactNode;
}

export default function ListingItemRow({
                                           avatar,
                                           title,
                                           subtitle,
                                           columns = [],
                                           status,
                                           actions,
                                       }: ListingItemRowProps) {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            {/* Checkbox */}
            <td className="w-4 p-4">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded-sm text-blue-600 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
            </td>

            {/* Avatar + Nome + Email */}
            <td className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white max-w-[400px] sm:max-w-[3000px]">
                {avatar && (
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-sm font-bold text-white mr-3 shrink-0">
                        {avatar}
                    </div>
                )}
                <div className="min-w-0">
                    <div
                        className="text-base font-semibold truncate"
                        title={title}
                    >
                        {title}
                    </div>
                    {subtitle && (
                        <div
                            className="text-sm text-gray-500 truncate"
                            title={subtitle}
                        >
                            {subtitle}
                        </div>
                    )}
                </div>
            </td>

            {/* Colunas adicionais com responsividade */}
            {columns.map((col, index) => (
                <td
                    key={index}
                    className="px-6 py-4 max-w-[300px] sm:max-w-[150px] truncate whitespace-nowrap overflow-hidden text-gray-500 dark:text-gray-400"
                    title={typeof col === 'string' ? col : undefined}
                >
                    {col}
                </td>
            ))}

            {/* Status */}
            <td className="px-6 py-4">{status}</td>

            {/* Ações */}
            <td className="px-6 py-4">{actions}</td>
        </tr>
    );
}
