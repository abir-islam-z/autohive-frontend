import PrivateRoute from "@/layout/PrivateRoute";
import ManageOrders from "@/pages/admin/ManageOrders";
import ManageProducts from "@/pages/admin/ManageProducts";
import ManageUsers from "@/pages/admin/ManageUsers";
import { SidebarLink } from "@/types/sidebar.type";
import { FileText, ShoppingCart, Users } from "lucide-react";

export const adminLinks: SidebarLink[] = [
  {
    path: "/dashboard/users",
    label: "Manage Users",
    icon: <Users className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/" requireAdmin>
        <ManageUsers />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/products",
    label: "Manage Products",
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/" requireAdmin>
        <ManageProducts />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/manage-orders",
    label: "Manage Orders",
    icon: <FileText className="mr-2 h-4 w-4" />,
    element: (
      <PrivateRoute redirectPath="/" requireAdmin>
        <ManageOrders />
      </PrivateRoute>
    ),
  },
];
