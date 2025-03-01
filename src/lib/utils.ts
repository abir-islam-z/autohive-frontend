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
  } else if (typeof error === "string") {
    return error;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "string"
  ) {
    return error.data;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "message" in error.data &&
    typeof error.data.message === "string"
  ) {
    return error.data.message;
  } else {
    return "An unknown error occurred";
  }
}

/* type TRoute = {
  path: string;
  element: React.ReactNode;
}; */
/* export function generateRoutes(items: SidebarLink[]) {
  const routes = items.reduce((acc: TRoute[], item) => {
    // const path = item.path.split("/")[2];

    let currentItem = {} as TRoute;
    if (item.path) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      const childrenRoutes = generateRoutes(item.children);
      acc.push(...childrenRoutes);
    }

    console.log(acc);
    return acc; // Return the accumulator for the next iteration
  }, []);

  return routes;
} */

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export const getGravatarUrl = (email: string) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}`;
};

// Add this function to your existing utils file
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const badgeColor = {
  pending: "bg-yellow-500 text-yellow-900",
  processing: "bg-blue-500 text-blue-900",
  shipped: "bg-gray-500 text-gray-900",
  delivered: "bg-green-500 text-green-900",
  cancelled: "bg-red-500 text-red-900",
};
