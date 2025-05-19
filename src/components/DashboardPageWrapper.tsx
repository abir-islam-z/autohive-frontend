import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React from "react";
import { useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

type DashboardPageWrapperProps = {
  children?: React.ReactNode;
  className?: string;
  pageHref?: string;
  pageHeading?: string;
};

export default function DashboardPageWrapper({
  children,
  className,
  pageHref,
  pageHeading,
}: DashboardPageWrapperProps) {
  const { pathname } = useLocation();
  return (
    <>
      <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={pageHref ?? pathname}>
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageHeading ?? "Dashboard Page"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div
        className={cn(
          " md:px-12 px-8 py-16 bg-background h-full overflow-y-auto",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}
