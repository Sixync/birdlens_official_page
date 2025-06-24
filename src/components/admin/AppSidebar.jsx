// file: birdlen_official_page/src/components/admin/AppSidebar.jsx
import React from 'react';
import { Home, Image as ImageIcon, Map, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '../ui/admin/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

const navMain = [
  {
    title: 'Dashboard',
    icon: Home,
    path: '/admin',
  },
  {
    title: 'Tours',
    icon: Map,
    path: '/admin/tours',
  },
   // Add more admin sections here in the future
  // {
  //   title: 'Users',
  //   icon: Users,
  //   path: '/admin/users',
  // },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gray-700">
                <img src="/images/logo.png" alt="BirdLens Logo" className="size-full object-contain p-1" />
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-semibold text-white">BirdLens</span>
                <span className="text-xs text-gray-400">Admin Panel</span>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navMain.map((item) => {
            const Icon = item.icon;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                  className="text-gray-300"
                >
                  {Icon && <Icon strokeWidth={1.5} />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* Placeholder for user profile section in footer */}
      </SidebarFooter>
    </Sidebar>
  );
}