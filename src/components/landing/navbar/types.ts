
export interface NavItem {
  label: string;
  href: string;
}

export interface ChildNavItem {
  label: string;
  href: string;
}

export interface TopNavItem {
  label: string;
  href: string;
  icon?: string;
  children?: ChildNavItem[];
  action?: boolean;
}
