import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";
import md5 from "md5";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes"
  }`;
}
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
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200 capitalize",
  processing: "bg-blue-50 text-blue-700 border-blue-200 capitalize",
  shipped: "bg-gray-50 text-gray-700 border-gray-200 capitalize",
  delivered: "bg-green-50 text-green-700 border-green-200 capitalize",
  cancelled: "bg-red-50 text-red-700 border-red-200 capitalize",
  /*  active: "bg-green-50 text-green-700 border-green-200 capitalize w-16",
  inactive: "bg-red-50 text-red-700 border-red-200 capitalize w-16",
  success: "bg-green-50 text-green-700 border-green-200 capitalize w-16",
  error: "bg-red-50 text-red-700 border-red-200 capitalize w-16",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200 capitalize w-16",
  info: "bg-blue-50 text-blue-700 border-blue-200 capitalize w-16", */
};
