
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopBar from "./TopBar";

const AppLayout = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="min-h-screen flex w-full antialiased">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <TopBar />
          <main className="flex-grow p-4 md:p-8 animate-fade-in">
            <Outlet />
          </main>
        </div>
        <Toaster />
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
