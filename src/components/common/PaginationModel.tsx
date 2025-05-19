import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationModelProps = {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PaginationModel({
  page,
  totalPage,
  setPage,
}: PaginationModelProps) {
  return (
    <div className="flex justify-center mt-12 gap-4">
      <Button
        variant="outline"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page <= 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="flex items-center px-4 bg-white rounded-md shadow-sm border border-gray-200">
        <span className="text-gray-600">Page</span>
        <span className="font-medium mx-2 text-blue-600">{page}</span>
        <span className="text-gray-600">of {totalPage}</span>
      </div>

      <Button
        variant="outline"
        onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
        disabled={page >= totalPage}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
}
