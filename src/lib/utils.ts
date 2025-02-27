import { SidebarLink } from "@/types/sidebar.type";
import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import md5 from "md5";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shapeError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  }

  return "An error occurred";
}

export function generateRoutes(items: SidebarLink[]) {
  const routes = items.map((item) => {
    const path = item.path.split("/")[2];
    return {
      path,
      element: item.element,
    };
  });

  return routes;
}

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export const getGravatarUrl = (email: string) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}`;
};
