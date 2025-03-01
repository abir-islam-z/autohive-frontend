/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { IOrder, OrderStatus } from "@/types/order.type";
import { ColumnDef } from "@tanstack/react-table";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Convert simple strings to objects with value and label
const STATUS_OPTIONS = [
  { value: "All", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
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
        "pending") as OrderStatus;
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
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEditOrder(row.original._id)}
      >
        Edit
      </Button>
    ),
  },
];

export default function ManageOrders() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
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
  } = useGetOrdersQuery({
    search: searchTerm,
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

  const handleSearchChange = debounce((value: string) => {
    setSearchTerm(value);
    setPage(1);
  }, 400);

  const handleEditOrder = (orderId: string) => {
    navigate(`/dashboard/edit-order/${orderId}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
        <div>Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div>Error loading orders. Please try again later.</div>
      </div>
    );
  }

  // Make sure to use IOrder type here
  const columns = createColumns(handleEditOrder);

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>

      {/* Filter Controls */}
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
        data={ordersData?.data || []}
        columns={columns}
        serverPagination={{
          pageCount: ordersData?.meta?.totalPage || 1,
          currentPage: page,
        }}
        onPaginationChange={(newPagination) => {
          setPage(newPagination.pageIndex + 1);
        }}
      />
    </div>
  );
}
