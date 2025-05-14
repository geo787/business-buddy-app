
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { Home, Users, BarChart3, Settings, LifeBuoy, ChevronLeft, ChevronRight, Truck, CreditCard } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect } from "react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { collapsed, setCollapsed } = useSidebar();
  const isMobile = useIsMobile();

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile, setCollapsed]);

  // Close sidebar when navigating on mobile
  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: Home
    },
    {
      title: "Customers",
      path: "/customers",
      icon: Users
    },
    {
      title: "Logistics",
      path: "/logistics",
      icon: Truck
    },
    {
      title: "Finance",
      path: "/finance",
      icon: CreditCard
    },
    {
      title: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings
    },
  ];

  return (
    <Sidebar className="border-r border-border/40 z-20">
      <SidebarHeader className="py-4 md:py-6 flex items-center justify-between px-4">
        <div className={cn("flex items-center gap-2 transition-opacity", {
          "opacity-0": collapsed,
          "opacity-100": !collapsed
        })}>
          <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">BB</span>
          </div>
          <h1 className="font-bold text-lg tracking-tight">Business Buddy</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    className={cn({
                      "bg-accent text-accent-foreground font-medium": location.pathname === item.path
                    })}
                    aria-label={item.title}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-4">
        <div className="px-3">
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={() => window.dispatchEvent(new Event('toggle-assistant'))}
              aria-label="AI Assistant"
            >
              <LifeBuoy size={18} />
              <span>AI Assistant</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
