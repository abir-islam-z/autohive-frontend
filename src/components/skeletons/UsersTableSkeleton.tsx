import { Skeleton } from "@/components/ui/skeleton";

export default function UsersTableSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Search bar skeleton */}
      <Skeleton className="h-10 w-full" />

      {/* Filters section skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      
      {/* Reset button skeleton */}
      <Skeleton className="h-10 w-36" />

      {/* Results count skeleton */}
      <Skeleton className="h-5 w-36 mb-2" />

      {/* Table skeleton */}
      <div className="border rounded-md">
        {/* Header */}
        <div className="border-b bg-muted/50 p-4">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-6 w-24" />
            ))}
          </div>
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border-b p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="flex space-x-2">
                <Skeleton className="h-9 w-20 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-end items-center pt-4">
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}