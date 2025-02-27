"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { adminLinks } from "@/routes/admin.route";
import { userLinks } from "@/routes/user.route";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const links = user?.role === "admin" ? adminLinks : userLinks;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-16",
          "fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className={cn("font-semibold text-xl", !sidebarOpen && "hidden")}>
            Dashboard
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            {sidebarOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav
          className="mt-5 px-2 flex flex-col justify-between"
          style={{ height: "calc(100% - 60px)" }}
        >
          <ul>
            {links?.map((link) => (
              <li key={link.path} className="mb-2">
                <Link to={link.path}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      location.pathname === link.path && "bg-gray-200",
                      !sidebarOpen && "justify-center p-2"
                    )}
                  >
                    {link.icon}
                    {sidebarOpen && <span className="ml-2">{link.label}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className="mt-auto mb-4">
              <Button
                variant={"ghost"}
                className={cn("w-full")}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                {sidebarOpen && <span className="ml-2">Logout</span>}
              </Button>
            </div>
          )}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
