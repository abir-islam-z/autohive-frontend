import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Error",
  message = "Something went wrong. Please try again later.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center text-center border rounded-lg bg-muted/20">
      <AlertCircle className="h-12 w-12 text-destructive mb-3" />
      <h3 className="text-lg font-medium text-destructive mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}
