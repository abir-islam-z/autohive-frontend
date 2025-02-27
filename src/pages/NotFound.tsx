import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 md:py-24">
      <div className="flex flex-col items-center text-center space-y-6 max-w-md">
        {/* 404 Text */}
        <h1 className="text-9xl font-extrabold text-primary">404</h1>

        {/* Page not found text */}
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>

        {/* Description */}
        <p className="text-muted-foreground text-lg">
          We couldn't find the page you're looking for. It might have been
          moved, deleted, or perhaps never existed.
        </p>

        {/* Divider */}
        <div className="w-full border-t border-border my-4" />

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Go Back
          </Button>

          <Button asChild className="flex items-center gap-2">
            <Link to="/">
              <HomeIcon className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
