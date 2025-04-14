import { JSX, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
    LayoutGrid,
    Folder,
    BookOpen,
    Users,
    Users2,
    ChevronDown,
} from 'lucide-react';
import AppLogo from './app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

export function AppSidebar() {
    const [adminOpen, setAdminOpen] = useState(false);

    function renderAdminSubmenu(): JSX.Element {
        return (
            <>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={route('admin.employees.index')}>
                            <Users className="h-4 w-4" />
                            <span>Colaboradores</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href={route('admin.teams.index')}>
                            <Users2 className="h-4 w-4" />
                            <span>Equipes</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </>
        );
    }


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    items={[{ title: 'Dashboard', href: '/dashboard', icon: LayoutGrid }]}
                />

                <SidebarMenu className="mt-4">
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => setAdminOpen(!adminOpen)}>
                            <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <Users2 className="h-4 w-4" />
                  <span>Administrativo</span>
                </span>
                                <ChevronDown
                                    className={`h-4 w-4 transition-transform ${
                                        adminOpen ? 'rotate-180' : ''
                                    }`}
                                />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    {adminOpen ? renderAdminSubmenu() : null}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter
                    items={[
                        {
                            title: 'Repository',
                            href: 'https://github.com/laravel/react-starter-kit',
                            icon: Folder,
                        },
                        {
                            title: 'Documentation',
                            href: 'https://laravel.com/docs/starter-kits',
                            icon: BookOpen,
                        },
                    ]}
                    className="mt-auto"
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
