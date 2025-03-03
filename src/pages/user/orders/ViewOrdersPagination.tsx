/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

type ViewOrdersPaginationProps = {
  ordersData: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function ViewOrdersPagination({
  ordersData,
  page,
  setPage,
}: ViewOrdersPaginationProps) {
  return (
    <div>
      {ordersData?.meta && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {Array.from(
              { length: Math.min(5, ordersData.meta.totalPage) },
              (_, i) => {
                // Calculate page numbers to show based on current page
                let pageNum = page;
                if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= ordersData.meta.totalPage - 2) {
                  pageNum = ordersData.meta.totalPage - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                // Ensure page numbers are within valid range
                if (pageNum > 0 && pageNum <= ordersData.meta.totalPage) {
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      className="w-9 h-9 p-0"
                      onClick={() => setPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                return null;
              }
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= ordersData.meta.totalPage}
          >
            Next
          </Button>
        </div>
      )}

      {ordersData?.meta && (
        <div className="text-center text-sm text-muted-foreground mt-2">
          Page {page} of {ordersData.meta.totalPage} ({ordersData.meta.total}{" "}
          orders)
        </div>
      )}
    </div>
  );
}
