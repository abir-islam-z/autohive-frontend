"use client";

import { cn } from "@/lib/utils";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { LogOut, Menu, TerminalSquare, User } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

type NavLink = {
  label: string;
  path: string;
};

const navLinks: NavLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Products",
    path: "/products",
  },
  {
    label: "About",
    path: "/about",
  },
];

type AuthLink = {
  label: string;
  path: string;
  variant?:
    | "default"
    | "link"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | null
    | undefined;
};

const authLinks: AuthLink[] = [
  {
    label: "Log in",
    path: "/auth/login",
    variant: "default",
  },
  {
    label: "Sign up",
    path: "/auth/register",
    variant: "outline",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  // This would typically come from your auth context/provider

  // Placeholder user data - replace with actual user data from your auth system

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const isAuthenticated = Boolean(user);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          {/* Site Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-12" src="/logo.png" alt="AutoHive" />
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium",
                    {
                      "border-gray-900": isActive,
                    }
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="rounded-lg">U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/dashboard" className="flex items-center">
                      <TerminalSquare className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* only login and Register */
              authLinks.map((link) => (
                <Link key={link.path} to={link.path}>
                  <Button variant={link.variant!} className="mr-2">
                    {link.label}
                  </Button>
                </Link>
              ))
            )}
          </div>
          <div className="sm:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="text-lg font-medium"
                      onClick={toggleMenu}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="text-lg font-medium flex items-center"
                        onClick={toggleMenu}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <button
                        className="text-lg font-medium text-red-500 flex items-center"
                        onClick={() => {
                          handleLogout();
                          toggleMenu();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    authLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="text-lg font-medium"
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    ))
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
