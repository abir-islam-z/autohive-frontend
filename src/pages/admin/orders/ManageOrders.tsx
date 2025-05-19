/* eslint-disable @typescript-eslint/no-explicit-any */
import { EmptyState } from "@/components/common/EmptyState";
import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import ErrorState from "@/components/errors/ErrorState";
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/components/ui/global-buttons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { badgeColor, cn, formatDate } from "@/lib/utils";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { ORDERS_PATH } from "@/routes/admin.route";
import { IOrder, TOrderStatus } from "@/types/order.type";
import { ColumnDef } from "@tanstack/react-table";
import { Package, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import OrdersTableSkeleton from "../../../components/skeletons/OrdersTableLoadingSkeleton";

// Convert simple strings to objects with value and label
const STATUS_OPTIONS = [
  { value: "All", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
];

// Create columns definition for Tanstack Table matching your IOrder interface
const createColumns = (
  onEditOrder: (id: string) => void
): ColumnDef<IOrder, any>[] => [
  {
    accessorKey: "orderId", // changed from orderNumber to match IOrder
    header: "Order #",
    cell: ({ row }) => <div>{row.getValue("orderId")}</div>,
  },
  {
    accessorKey: "email", // changed from customerName to match IOrder
    header: "Customer",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "totalPrice", // changed from totalAmount to match IOrder
    header: "Amount",
    cell: ({ row }) => {
      const amount = row.getValue<number | undefined>("totalPrice");
      return <div>${amount != null ? amount.toFixed(2) : "0.00"}</div>;
    },
  },
  {
    accessorKey: "currentStatus", // changed from status to match IOrder
    header: "Status",
    cell: ({ row }) => {
      const status = (row.getValue<string>("currentStatus") ||
        "pending") as TOrderStatus;
      return (
        <Badge
          className={cn("capitalize pointer-events-none", badgeColor[status])}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue<Date | string | undefined>("createdAt");
      return <div>{date ? formatDate(date.toString()) : "N/A"}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <EditButton onClick={() => onEditOrder(row.original._id)} />
    ),
  },
];

export default function ManageOrders() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [searchValue] = useDebounce(searchTerm, 300);

  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "All"
  );
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const {
    data: ordersData,
    isLoading,
    isError,
    refetch,
  } = useGetOrdersQuery({
    search: searchValue,
    status: statusFilter !== "All" ? statusFilter : undefined,
    page,
    limit: 10,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (statusFilter !== "All") params.set("status", statusFilter);
    params.set("page", page.toString());
    setSearchParams(params);
  }, [searchTerm, statusFilter, page, setSearchParams]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleEditOrder = (orderId: string) => {
    navigate(ORDERS_PATH + `/${orderId}`);
  };
  const columns = createColumns(handleEditOrder);

  let content = null;

  if (isLoading) {
    content = <OrdersTableSkeleton />;
  } else if (isError) {
    content = (
      <ErrorState message="Failed to load orders" onRetry={() => refetch()} />
    );
  } else if (ordersData?.data && ordersData?.data?.length > 0) {
    content = (
      <>
        {/* Existing search, filter and data table components */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-48">
            <Label htmlFor="status">Status</Label>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          data={ordersData.data}
          columns={columns}
          serverPagination={{
            pageCount: ordersData?.meta?.totalPage || 1,
            currentPage: page,
          }}
          onPaginationChange={(newPagination) => {
            setPage(newPagination.pageIndex + 1);
          }}
        />
      </>
    );
  } else {
    content = (
      <>
        {/* Keep the search and filter components to allow users to change their search criteria */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="w-full md:w-48">
            <Label htmlFor="status">Status</Label>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Empty state component */}
        <EmptyState
          icon={Package}
          title="No Orders Found"
          description={
            searchTerm || statusFilter !== "All"
              ? "Try adjusting your search or filter criteria."
              : "No orders have been placed yet."
          }
          actionLabel="Refresh"
          actionIcon={RefreshCw}
          onAction={() => refetch()}
        />
      </>
    );
  }

  return (
    <DashboardPageWrapper pageHeading="Manage Orders">
      {content}
    </DashboardPageWrapper>
  );
}
