import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  redirectPath: string;
  children: ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({
  redirectPath,
  children,
  requireAdmin = false,
}: PrivateRouteProps) => {
  const location = useLocation();
  const { user } = useAppSelector((state: RootState) => state.auth);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user has admin role when required
  const hasAdminAccess = requireAdmin ? user?.role === "admin" : true;

  // User is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // User is authenticated but doesn't have admin access when required
  if (!hasAdminAccess) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // User has all required permissions
  return <>{children}</>;
};

export default PrivateRoute;
