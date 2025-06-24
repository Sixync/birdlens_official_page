// file: birdlen_official_page/src/components/ui/admin/sidebar.jsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';

import { cn } from '../../../utils/cn'; // Assuming you have a cn utility
import { Button } from './button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const SidebarContext = React.createContext(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

export const SidebarProvider = React.forwardRef(
  ({ children, ...props }, ref) => {
    // In a real app, you'd manage this state, possibly with cookies or context providers higher up.
    // For this implementation, we'll keep it simple and default to expanded.
    const [open, setOpen] = React.useState(true);
    const [openMobile, setOpenMobile] = React.useState(false);
    const isMobile = false; // Simplified for this example

    const toggleSidebar = React.useCallback(() => {
      isMobile ? setOpenMobile((v) => !v) : setOpen((v) => !v);
    }, [isMobile]);

    const state = open ? 'expanded' : 'collapsed';

    const contextValue = React.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            ref={ref}
            className={cn('group/sidebar-wrapper flex min-h-svh w-full')}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';

export const Sidebar = React.forwardRef(
  (
    {
      className,
      collapsible = 'icon',
      side = 'left',
      variant = 'sidebar',
      children,
      ...props
    },
    ref
  ) => {
    const { state } = useSidebar();
    return (
      <div
        ref={ref}
        className={cn(
          'group peer hidden md:block text-sidebar-foreground',
          className
        )}
        data-state={state}
        data-collapsible={state === 'collapsed' ? collapsible : ''}
        {...props}
      >
        <div
          className={cn(
            'fixed inset-y-0 z-10 hidden h-svh w-[16rem] transition-[width] duration-200 ease-linear md:flex',
            state === 'collapsed' && 'w-[3rem]'
          )}
        >
          <div
            data-sidebar="sidebar"
            className="flex size-full flex-col bg-[#141414] border-r border-gray-100/10"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);
Sidebar.displayName = 'Sidebar';

export const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
));
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
        className
      )}
      {...props}
    />
  )
);
SidebarContent.displayName = 'SidebarContent';

export const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn('flex flex-col gap-2 p-2 mt-auto', className)}
    {...props}
  />
));
SidebarFooter.displayName = 'SidebarFooter';

export const SidebarInset = React.forwardRef(({ className, ...props }, ref) => (
  <main
    ref={ref}
    className={cn(
      'relative flex min-h-svh flex-1 flex-col bg-[#1a1b24]',
      'md:ml-[16rem] transition-[margin-left] duration-200 ease-linear',
      'peer-data-[state=collapsed]:md:ml-[3rem]',
      className
    )}
    {...props}
  />
));
SidebarInset.displayName = 'SidebarInset';

export const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-1 p-2', className)}
    {...props}
  />
));
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  )
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

const sidebarMenuButtonVariants = cva(
    'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-[#2c333a] hover:text-white focus-visible:ring-2 active:bg-sidebar-accent data-[active=true]:bg-[#2563eb] data-[active=true]:text-white data-[state=open]:bg-[#2c333a] data-[state=open]:text-white group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: {
        default: 'h-8 text-sm',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export const SidebarMenuButton = React.forwardRef(
  (
    { asChild = false, isActive = false, tooltip, size, className, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const { state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ size }), className)}
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== 'collapsed'}
          className="bg-[#141414] text-white border-gray-100/10"
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }
);
SidebarMenuButton.displayName = 'SidebarMenuButton';