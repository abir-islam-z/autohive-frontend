"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useGetCarsQuery } from "@/redux/features/car/carApi";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  const {
    data: carData,
    isLoading,
    error,
  } = useGetCarsQuery({
    limit: 3,
    page: 1,
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Log the data for debugging
  useEffect(() => {
    console.log("Current car data:", carData);
  }, [carData]);

  // Create a ref for the autoplay plugin
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle pause/resume of autoplay
  useEffect(() => {
    if (!api || !autoplayRef.current) return;

    try {
      if (isPaused) {
        autoplayRef.current.stop();
      } else {
        autoplayRef.current.play();
      }
    } catch (error) {
      console.error("Error with autoplay:", error);
    }
  }, [api, isPaused]);

  if (isLoading) {
    return (
      <div className="h-[600px] bg-muted/50 animate-pulse flex items-center justify-center">
        <div className="text-xl text-muted-foreground">
          Loading featured vehicles...
        </div>
      </div>
    );
  }

  // Handle different data structures and potential errors
  const cars = carData?.data || [];
  console.log("Cars to be rendered:", cars.length);

  if (error || cars.length === 0) {
    // Fallback banner if API fails or no cars found
    return (
      <div className="relative h-[600px] w-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
        <div className="text-center p-8 max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-primary">
            Welcome to AutoHive
          </h2>
          <p className="text-xl mb-8">
            Discover the perfect vehicle for your lifestyle
          </p>
          <Button size="lg" asChild>
            <Link to="/products">Browse Vehicles</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-[600px] w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Carousel
        setApi={setApi}
        plugins={[autoplayRef.current]}
        className="w-full h-full"
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent className="h-full">
          {cars.map((car, index) => {
            console.log(`Rendering car ${index}:`, car.brand, car.model);
            return (
              <CarouselItem key={car._id || index} className="h-full relative">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-gray-800"
                  style={{
                    backgroundImage: `url("${
                      car.images?.[0] || "/fallback-image.jpg"
                    }")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                      className="max-w-xl text-white"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      key={index}
                    >
                      <h2 className="text-5xl font-bold mb-4">
                        {car.brand || "Featured"} {car.model || "Vehicle"}
                      </h2>
                      <p className="text-xl mb-8">
                        {car.description ||
                          "Explore our collection of premium vehicles."}
                      </p>
                      <Link to={car._id ? `/products/${car._id}` : "/products"}>
                        <Button size="lg" className="group">
                          <span>Explore Now</span>
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {cars.length > 1 && (
          <>
            {/* Navigation arrows - custom styled */}
            <div className="absolute z-10 inset-y-0 left-0 right-0 flex items-center justify-between px-4">
              <CarouselPrevious className="relative left-0 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-white/20" />
              <CarouselNext className="relative right-0 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-white/20" />
            </div>

            {/* Indicators */}
            <div className="absolute bottom-10 left-10 z-10">
              <div className="flex space-x-2">
                {cars.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      current === index
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/80"
                    )}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
}
