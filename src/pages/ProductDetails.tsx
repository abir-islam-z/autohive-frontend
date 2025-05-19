"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CURRENCY_SYMBOL } from "@/lib/const";
import { useGetCarByIdQuery } from "@/redux/features/car/carApi";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const { data: car, isLoading, error } = useGetCarByIdQuery(id as string);

  const handleBuyNow = () => {
    // In a real application, you would add the product to the cart here
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="h-10 w-1/3" />
            <Separator />
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[120px] w-full" />
            </div>
            <Separator />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-card border rounded-xl shadow-sm">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Vehicle Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          The vehicle you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/products")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Vehicles
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image section */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl overflow-hidden border bg-muted/30">
            <img
              src={car?.data?.image}
              alt={`${car?.data?.brand} ${car?.data?.model}`}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        {/* Details section */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="px-2 py-1">
                {car?.data?.category}
              </Badge>
              <Badge variant="outline" className="px-2 py-1">
                {car?.data?.year}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {car?.data?.brand} {car?.data?.model}
            </h1>
            <p className="text-muted-foreground">
              {car?.data?.description ||
                "This premium vehicle combines style, performance, and reliability for an exceptional driving experience."}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-primary">
              {CURRENCY_SYMBOL[car?.data?.currency!]}{" "}
              {car?.data?.price?.toLocaleString()}
            </div>
            <div className="flex items-center gap-2">
              {car?.data?.inStock ? (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-green-50 text-green-600 border-green-200 py-1 px-2"
                >
                  <Check className="h-4 w-4" />
                  In Stock ({car?.data?.quantity})
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-600 border-red-200"
                >
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Brand</span>
                  <span className="font-medium">{car?.data?.brand}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Model</span>
                  <span className="font-medium">{car?.data?.model}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Year</span>
                  <span className="font-medium">{car?.data?.year}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Category
                  </span>
                  <span className="font-medium">{car?.data?.category}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Stock</span>
                  <span className="font-medium">
                    {car?.data?.quantity || 0}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Color</span>
                  <span className="font-medium">
                    {car?.data?.color || "Black"}
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Engine</span>
                  <span className="font-medium">
                    {car?.data?.engine || "2.0L 4-Cylinder"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Transmission
                  </span>
                  <span className="font-medium">
                    {car?.data?.transmission || "Automatic"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Fuel Type
                  </span>
                  <span className="font-medium">
                    {car?.data?.fuelType || "Gasoline"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Mileage</span>
                  <span className="font-medium">
                    {car?.data?.mileage || "0"} miles
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Horsepower
                  </span>
                  <span className="font-medium">
                    {car?.data?.horsepower || "180"} hp
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">
                    Drive Type
                  </span>
                  <span className="font-medium">
                    {car?.data?.driveType || "FWD"}
                  </span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-3">
                <p className="text-muted-foreground">
                  Free shipping on all vehicle purchases.
                </p>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Vehicle preparation takes 2-3 business days
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Delivery options and timelines will be discussed after
                  purchase. Home delivery available in select areas.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Separator />

          {car?.data?.inStock ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label htmlFor="quantity" className="font-medium">
                  Quantity:
                </label>
                <Input
                  type="number"
                  id="quantity"
                  min="1"
                  max={car?.data?.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={handleBuyNow} size="lg" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate("/products")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Button disabled size="lg" className="w-full">
                Out of Stock
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => navigate("/products")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Vehicles
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
