
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

// Define the SidebarContext type
interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context with default values
const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => {},
});

// Create a provider component
interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export const SidebarProvider = ({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined)
    throw new Error("useSidebar must be used within a SidebarProvider");
  return context;
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  const { collapsed } = useSidebar();
  return (
    <div
      className={cn(
        "h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
        className
      )}
      {...props}
    />
  );
};

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarHeader = ({
  className,
  ...props
}: SidebarHeaderProps) => {
  return (
    <div
      className={cn("flex items-center", className)}
      {...props}
    />
  );
};

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarContent = ({
  className,
  ...props
}: SidebarContentProps) => {
  return (
    <div
      className={cn("overflow-y-auto flex-1", className)}
      {...props}
    />
  );
};

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarFooter = ({
  className,
  ...props
}: SidebarFooterProps) => {
  return (
    <div
      className={cn("", className)}
      {...props}
    />
  );
};

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroup = ({ className, ...props }: SidebarGroupProps) => {
  return (
    <div
      className={cn("py-2", className)}
      {...props}
    />
  );
};

interface SidebarGroupLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupLabel = ({
  className,
  ...props
}: SidebarGroupLabelProps) => {
  const { collapsed } = useSidebar();
  
  if (collapsed) {
    return null;
  }
  
  return (
    <div
      className={cn("px-3 py-2 text-xs font-medium text-sidebar-foreground/60", className)}
      {...props}
    />
  );
};

interface SidebarGroupContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarGroupContent = ({
  className,
  ...props
}: SidebarGroupContentProps) => {
  return (
    <div
      className={cn("", className)}
      {...props}
    />
  );
};

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenu = ({ className, ...props }: SidebarMenuProps) => {
  return (
    <div
      className={cn("py-1", className)}
      {...props}
    />
  );
};

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SidebarMenuItem = ({
  className,
  ...props
}: SidebarMenuItemProps) => {
  return (
    <div
      className={cn("px-3 py-1", className)}
      {...props}
    />
  );
};

interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SidebarMenuButton = ({
  className,
  children,
  ...props
}: SidebarMenuButtonProps) => {
  const { collapsed } = useSidebar();
  
  return (
    <button
      className={cn(
        "flex items-center w-full px-3 py-2 text-sidebar-foreground rounded-md text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        {React.Children.map(children, (child, index) => {
          if (index === 0) {
            return child; // Always render the icon
          }
          
          // Only render non-icon children if not collapsed
          return !collapsed ? child : null;
        })}
      </div>
    </button>
  );
};
