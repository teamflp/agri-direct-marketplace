
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MenuItem {
  title: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  name: string;
  email: string;
  avatar: string | React.ReactNode;
  menuItems: MenuItem[];
  children: React.ReactNode;
}

const DashboardSidebar = ({ name, email, avatar, menuItems }: SidebarProps) => {
  const { state } = useSidebar();
  const location = useLocation();
  const isMobile = useIsMobile();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex flex-col items-center p-4">
          <Avatar className="h-16 w-16 mb-4">
            {typeof avatar === 'string' ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              avatar
            )}
          </Avatar>
          <div className={cn("text-center transition-opacity", 
            state === "collapsed" && !isMobile ? "opacity-0" : "opacity-100")}>
            <h2 className="text-lg font-bold">{name}</h2>
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                tooltip={item.title}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/">
            Retour au site
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

const DashboardLayout = ({ name, email, avatar, menuItems, children }: SidebarProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow pt-16 bg-gray-50">
        <SidebarProvider>
          <div className="flex w-full min-h-screen">
            <DashboardSidebar 
              name={name} 
              email={email} 
              avatar={avatar} 
              menuItems={menuItems}
              children={children}
            />
            <main className="flex-1 p-4 md:p-8">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardLayout;
