import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminRoute = () => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user has admin role when required
  const hasAdminAccess = user?.role === "admin";

  // User is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // User is authenticated but doesn't have admin access when required
  if (!hasAdminAccess) {
    return <Navigate to={"/dashboard"} state={{ from: location }} replace />;
  }

  // User has all required permissions
  return <Outlet />;
};

export default AdminRoute;
