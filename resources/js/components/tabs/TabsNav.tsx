import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

interface TabItem {
    id: string;
    label: string;
    url: string;
}

interface TabsNavProps {
    tabs: TabItem[];
    className?: string;
}

export default function TabsNav({ tabs, className }: TabsNavProps) {
    const { url } = usePage(); // pega a URL atual do Inertia
    const currentPath = new URL(url, window.location.origin).pathname;

    return (
        <div className={cn('text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700', className)}>
            <ul className="flex flex-wrap -mb-px">
                {tabs.map((tab) => {
                    const tabPath = new URL(tab.url, window.location.origin).pathname;
                    const isActive = currentPath === tabPath;

                    return (
                        <li className="me-2" key={tab.id}>
                            <Link
                                href={tab.url}
                                className={cn(
                                    'inline-block p-4 border-b-2 rounded-t-lg',
                                    isActive
                                        ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {tab.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
