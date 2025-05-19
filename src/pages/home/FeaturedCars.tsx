import CarCards from "@/components/common/CarCards";
import ErrorState from "@/components/errors/ErrorState";
import FeaturedProductsSkeleton from "@/components/skeletons/FeaturedProductsSkeleton";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/getErrorMessage";
import { useGetCarsQuery } from "@/redux/features/car/carApi";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const {
    data: carData,
    isLoading,
    error,
    refetch,
  } = useGetCarsQuery({
    page: 1,
    limit: 6,
  });

  if (error) {
    return (
      <ErrorState
        title="An error occurred"
        onRetry={refetch}
        message={getErrorMessage(error) || "An error occurred"}
      />
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Featured Vehicles
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover our handpicked collection of premium vehicles
            </p>
          </div>
          <Link to="/products">
            <Button variant="ghost" className="group flex items-center gap-1">
              View All
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>

        {isLoading ? (
          <FeaturedProductsSkeleton />
        ) : (
          <CarCards carsData={carData?.data} />
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/products">
            <Button className="px-8" size="lg">
              Browse All Vehicles
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
