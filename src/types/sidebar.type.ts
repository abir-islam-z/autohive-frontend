export interface SidebarLink {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  element?: React.ReactNode;
  children?: SidebarLink[];
}
