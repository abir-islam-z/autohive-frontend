import { DataTable } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn} from "@/lib/utils";
import { getErrorMessage } from "@/lib/getErrorMessage";


import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "@/redux/features/user/userApi";
import { TUser } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { FilterX, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

export default function ManageUsers() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [searchValue] = useDebounce(searchTerm, 300);

  const [userStatus, setUserStatus] = useState(
    searchParams.get("status") || "All"
  );
  const [userRole, setUserRole] = useState(searchParams.get("role") || "All");
  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  // Create query parameters for the API call
  const queryParams = {
    search: searchValue || undefined,
    isBlocked: userStatus !== "All" ? userStatus === "Blocked" : undefined,
    role: userRole !== "All" ? userRole : undefined,
    page,
    limit: 10,
  };

  const { data: usersData, isError } = useGetAllUsersQuery(queryParams);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (userStatus !== "All") params.set("status", userStatus);
    if (userRole !== "All") params.set("role", userRole);
    params.set("page", page.toString());
    setSearchParams(params);
  }, [searchTerm, userStatus, userRole, page, setSearchParams]);

  const handleToggleUserStatus = async (userId: string) => {
    const user = usersData?.data?.find((user: TUser) => user._id === userId);
    const toastId = toast.loading(
      `Updating user status to ${user?.isBlocked ? "Active" : "Blocked"}...`
    );
    if (user) {
      try {
        await updateUser({
          id: userId,
          isBlocked: !user.isBlocked,
        }).unwrap();

        toast.success("User status updated successfully", {
          id: toastId,
          duration: 2000,
        });
      } catch (error) {
        toast.error(getErrorMessage(error), {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };

  const handleToggleUserRole = async (userId: string) => {
    const user = usersData?.data?.find((user: TUser) => user._id === userId);
    const toastId = toast.loading(
      `Updating user role to ${user?.role === "admin" ? "User" : "Admin"}...`
    );
    if (user) {
      try {
        const newRole = user.role === "admin" ? "user" : "admin";
        await updateUser({
          id: userId,
          role: newRole,
        }).unwrap();

        toast.success("User role updated successfully", {
          id: toastId,
          duration: 2000,
        });
      } catch (error) {
        toast.error(getErrorMessage(error), {
          id: toastId,
          duration: 2000,
        });
        console.error("Failed to update user role:", error);
      }
    }
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on search
  };

  const resetFilters = () => {
    setSearchTerm("");
    setUserStatus("All");
    setUserRole("All");
    setPage(1);
    setSearchParams({});
  };

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
          className="capitalize"
          variant={row.original.role === "admin" ? "default" : "outline"}
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={"outline"}
          className={cn("capitalize", {
            "bg-red-50 text-red-700 border-red-200": row.original.isBlocked,
            "bg-green-50 text-green-700 border-green-200":
              !row.original.isBlocked,
          })}
        >
          {row.original.isBlocked ? "Blocked" : "Active"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="w-20"
            variant={row.original.isBlocked ? "default" : "destructive"}
            onClick={() => handleToggleUserStatus(row.original?._id)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : null}
            {row.original.isBlocked ? "Unblock" : "Block"}
          </Button>

          <Button
            size="sm"
            className="w-24"
            onClick={() => handleToggleUserRole(row.original?._id)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : null}
            {row.original.role === "admin" ? "Make User" : "Make Admin"}
          </Button>
        </div>
      ),
    },
  ];

  if (isError)
    return (
      <div className="p-8">Error loading users. Please try again later.</div>
    );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Users</h2>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Filters section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Status filter */}
        <div>
          <Select
            value={userStatus}
            onValueChange={(value) => {
              setUserStatus(value);
              setPage(1); // Reset to first page on filter change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Role filter */}
        <div>
          <Select
            value={userRole}
            onValueChange={(value) => {
              setUserRole(value);
              setPage(1); // Reset to first page on filter change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reset filters button */}
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={resetFilters}
      >
        <FilterX className="h-4 w-4" />
        Reset Filters
      </Button>

      {/* Results count */}
      <div className="text-sm text-muted-foreground mb-2">
        Found {usersData?.meta?.total || 0} user
        {usersData?.meta?.total !== 1 ? "s" : ""}
      </div>

      <DataTable
        columns={columns}
        data={usersData?.data || []}
        serverPagination={{
          pageCount: usersData?.meta?.totalPage || 1,
          currentPage: page,
        }}
        onPaginationChange={(pagination) => {
          setPage(pagination.pageIndex + 1);
        }}
      />
    </div>
  );
}
