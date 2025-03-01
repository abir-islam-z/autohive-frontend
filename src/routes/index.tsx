import About from "@/pages/About";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";

// Admin pages

// User pages
import { AuthLayout } from "@/layout/AuthLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import PrivateRoute from "@/layout/PrivateRoute";
import ErrorPage from "@/pages/ErrorPage";
import NotFound from "@/pages/NotFound";
import { adminLinks } from "./admin.route";
import { userLinks } from "./user.route";

export const router = (isAdmin: boolean) =>
  createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "products/:id", element: <ProductDetails /> },
        { path: "about", element: <About /> },

        {
          path: "checkout",
          element: (
            <PrivateRoute redirectPath="/auth/login">
              <Checkout />
            </PrivateRoute>
          ),
        },
        // auth layout
        {
          path: "/auth",
          element: <AuthLayout />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
          ],
        },
      ],
    },

    {
      path: "/dashboard",
      errorElement: <ErrorPage />,
      element: (
        <PrivateRoute redirectPath="/auth/login">
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: isAdmin ? adminLinks : userLinks,
    },

    // not found
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
