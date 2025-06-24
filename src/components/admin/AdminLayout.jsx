// file: birdlen_official_page/src/components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import {
  SidebarInset,
  SidebarProvider,
} from '../ui/admin/sidebar';

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* The main content for each admin route will be rendered here */}
        <div className="p-8">
            <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}