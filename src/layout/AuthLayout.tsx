// If is logged in, redirect to dashboard\
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Navigate, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (user?.userId) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
