import AdminRoute from "@/layout/AdminRoute";
import ManageUsers from "@/pages/admin/ManageUsers";
import EditOrder from "@/pages/admin/orders/EditOrder";
import ManageOrders from "@/pages/admin/orders/ManageOrders";
import AddProduct from "@/pages/admin/product/AddProduct";
import EditProduct from "@/pages/admin/product/EditProduct";
import ManageProducts from "@/pages/admin/product/ManageProducts";
import { SidebarLink } from "@/types/sidebar.type";
import { FileText, ShoppingCart, Users } from "lucide-react";

export const ORDERS_PATH = "/dashboard/manage-orders";
export const PRODUCTS_PATH = "/dashboard/products";
export const USERS_PATH = "/dashboard/users";
export const DASHBOARD_PATH = "/dashboard";
export const ADD_PRODUCT_PATH = "/dashboard/products/add";

export const adminLinks: SidebarLink[] = [
  {
    path: "users",
    label: "Manage Users",
    icon: <Users className="mr-2 h-4 w-4" />,
    element: <AdminRoute />,
    children: [
      {
        path: "",
        element: <ManageUsers />,
      },
    ],
  },
  {
    path: "products",
    label: "Manage Products",
    icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    element: <AdminRoute />,
    children: [
      {
        path: "",
        element: <ManageProducts />,
      },
      {
        path: "add",
        element: <AddProduct />,
      },
      {
        path: ":productId",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "manage-orders",
    label: "Manage Orders",
    icon: <FileText className="mr-2 h-4 w-4" />,
    element: <AdminRoute />,
    children: [
      {
        path: "",
        element: <ManageOrders />,
      },
      {
        path: ":orderId",
        element: <EditOrder />,
      },
    ],
  },
];
