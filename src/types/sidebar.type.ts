export interface SidebarLink {
  key?: string;
  path: string;
  label?: string;
  icon?: React.ReactNode;
  element?: React.ReactNode;
  children?: SidebarLink[];
}
