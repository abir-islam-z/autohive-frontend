import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersTableSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Search and filter skeleton */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="w-full md:w-48 space-y-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-full md:w-48" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="border rounded-md">
        {/* Header */}
        <div className="border-b bg-muted/50 p-4">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-20" />
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}