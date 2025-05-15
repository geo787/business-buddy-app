
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import TopBar from "./TopBar";
import BrowserChrome from "./BrowserChrome";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = () => {
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider defaultCollapsed={isMobile}>
      <BrowserChrome>
        <div className="min-h-screen flex w-full antialiased">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-h-screen">
            <TopBar />
            <main className="flex-grow p-3 sm:p-4 md:p-8 animate-fade-in overflow-x-hidden">
              <Outlet />
            </main>
            <footer className="py-4 px-3 sm:px-4 md:px-8 text-center text-xs text-muted-foreground border-t">
              <p>© {new Date().getFullYear()} Customer Retention Platform. All rights reserved.</p>
            </footer>
          </div>
          <Toaster />
        </div>
      </BrowserChrome>
    </SidebarProvider>
  );
};

export default AppLayout;
