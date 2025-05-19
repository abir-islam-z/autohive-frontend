import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon, Package, RefreshCw } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon = RefreshCw,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg bg-card",
        className
      )}
    >
      <div className="bg-muted/30 rounded-full p-4 mb-4">
        <Icon className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      )}
      {onAction && actionLabel && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ActionIcon className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
