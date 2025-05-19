import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type FilterHandlerProps = {
  name: string;
  clearFilter: () => void;
  className?: string;
};

export default function FilterHandler({
  name,
  clearFilter,
  className,
}: FilterHandlerProps) {
  return (
    <span
      key={name}
      className={cn(
        "bg-purple-50 text-purple-700 text-xs rounded-full px-3 py-1 flex items-center gap-1",
        className
      )}
    >
      {name}
      <button onClick={clearFilter} className="ml-1">
        <X size={14} />
      </button>
    </span>
  );
}
