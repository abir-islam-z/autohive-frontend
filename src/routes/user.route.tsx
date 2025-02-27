import PrivateRoute from "@/layout/PrivateRoute";
import ChangePassword from "@/pages/user/ChangePassword";
import ManageProfile from "@/pages/user/ManageProfile";
import ViewOrders from "@/pages/user/ViewOrders";
import { SidebarLink } from "@/types/sidebar.type";
import { FileText, Key, User } from "lucide-react";

export const userLinks: SidebarLink[] = [
  {
    path: "/dashboard/my-orders",
    label: "My Orders",
    icon: <FileText className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/login">
        <ViewOrders />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/profile",
    label: "Manage Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/login">
        <ManageProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/change-password",
    label: "Change Password",
    icon: <Key className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/login">
        <ChangePassword />
      </PrivateRoute>
    ),
  },
];
