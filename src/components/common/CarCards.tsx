import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CURRENCY_SYMBOL } from "@/lib/const";
import { cn } from "@/lib/utils";
import { TCar } from "@/types/car.type";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Clock, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CarCards({
  carsData,
}: {
  carsData: TCar[] | undefined;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<
    Record<string, number>
  >({});

  const handleDotClick = (
    carId: string,
    index: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Prevent triggering other mouse events
    setActiveImageIndexes((prev) => ({
      ...prev,
      [carId]: index,
    }));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {carsData?.map((car) => {
        const currentImageIndex = activeImageIndexes[car._id] || 0;

        return (
          <motion.div
            key={car?._id}
            variants={item}
            onMouseEnter={() => setHoveredId(car?._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group"
          >
            <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
              <div className="relative overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "tween", duration: 0.3 }}
                  className="aspect-[16/10] relative"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${car._id}-${currentImageIndex}`}
                      src={car.images[currentImageIndex]}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Navigation dots */}
                {car.images.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex space-x-1.5 z-10">
                    {car.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => handleDotClick(car._id, index, e)}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all",
                          index === currentImageIndex
                            ? "bg-primary scale-110"
                            : "bg-white/70 hover:bg-white"
                        )}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Price tag */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="text-md font-bold px-3 py-1.5 shadow-sm"
                  >
                    {CURRENCY_SYMBOL[car.currency]} {car.price.toLocaleString()}
                  </Badge>
                </div>

                {/* Stock tag */}
                <div className="absolute top-4 left-4">
                  <Badge
                    variant={"outline"}
                    className={cn("px-3 py-1.5 bg-white", {
                      "text-primary": car.inStock,
                      "text-destructive": !car.inStock,
                    })}
                  >
                    {car.inStock
                      ? `In Stock (${car.quantity})`
                      : "Out of Stock"}
                  </Badge>
                </div>

                {/* Action buttons overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredId === car?._id ? 1 : 0,
                  }}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-3"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              <CardHeader>
                <motion.h3
                  className="text-xl font-bold"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {car.brand} {car.model}
                </motion.h3>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Badge variant="outline" className="mr-2">
                    {car.category}
                  </Badge>
                  <Badge variant="outline">{car.year}</Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  Added {format(new Date(car?.createdAt), "MMM d, yyyy")}
                </div>
              </CardContent>

              <CardFooter>
                <Link to={`/products/${car?._id}`} className="w-full">
                  <Button variant="default" className="w-full group">
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
