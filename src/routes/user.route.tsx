import ChangePassword from "@/pages/user/ChangePassword";
import ManageProfile from "@/pages/user/ManageProfile";
import ViewOrders from "@/pages/user/orders/ViewOrders";
import { SidebarLink } from "@/types/sidebar.type";
import { FileText, Key, User } from "lucide-react";

export const userLinks: SidebarLink[] = [
  {
    path: "orders",
    label: "Track My Orders",
    icon: <FileText className="mr-2 h-4 w-4" />,
    element: <ViewOrders />,
  },
  {
    path: "profile",
    label: "Manage Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    element: <ManageProfile />,
  },
  {
    path: "change-password",
    label: "Change Password",
    icon: <Key className="mr-2 h-4 w-4" />,
    element: <ChangePassword />,
  },
];
