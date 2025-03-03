import CircleCheck from "@/components/CircleCheck";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { badgeColor, cn } from "@/lib/utils";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import { OrderStatus } from "@/types/order.type";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, PackageIcon, TruckIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ViewOrdersPagination from "./ViewOrdersPagination";

const isStepComplete = (orderStatus: OrderStatus, step: string) => {
  const statusOrder: Record<OrderStatus, number> = {
    pending: 0,
    processing: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
  };

  return statusOrder[orderStatus] >= statusOrder[step as OrderStatus];
};

export default function ViewOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTracking, setActiveTracking] = useState<string | null>(null);

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const {
    data: ordersData,
    isLoading,
    error,
  } = useGetUserOrdersQuery({
    page,
    limit: 10,
  });

  const orders = ordersData?.data;

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    setSearchParams(params);
  }, [page, setSearchParams]);

  // Toggle tracking accordion
  const toggleTracking = (orderId: string) => {
    if (activeTracking === orderId) {
      setActiveTracking(null);
    } else {
      setActiveTracking(orderId);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <Card className="bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-500">
              Failed to load orders. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (orders?.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">My Orders</h2>
        <Card className="text-center py-12">
          <CardContent>
            <PackageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-xl font-medium">No orders yet</h3>
            <p className="mt-1 text-gray-500">
              When you place orders, they will appear here
            </p>
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/products")}
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-6">
        {orders?.map((order) => (
          <Card key={order?._id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="md:flex md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order?.orderId}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <CalendarIcon className="h-4 w-4" />
                    {format(new Date(order.createdAt), "PP")}
                  </CardDescription>
                </div>
                <Badge
                  className={cn(
                    badgeColor[order?.currentStatus],
                    "mt-2 md:mt-0 text-center"
                  )}
                  variant="outline"
                >
                  {order?.currentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {activeTracking === order._id && (
                  <div className="mb-6">
                    {/* Desktop Order Progress Tracker (horizontal) */}
                    <div className="hidden md:block">
                      <h4 className="font-medium mb-3">Order Progress</h4>
                      <div className="relative overflow-hidden">
                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 h-1.5 absolute top-3 left-2 z-0 rounded-full" />
                        <div
                          className="h-1.5 absolute top-3 left-2 z-0 rounded-full transition-all duration-500 bg-primary"
                          style={{
                            width:
                              order?.currentStatus === "pending"
                                ? "0%"
                                : order?.currentStatus === "processing"
                                ? "33.3%"
                                : order?.currentStatus === "shipped"
                                ? "66.6%"
                                : "100%",
                          }}
                        />

                        {/* Step Indicators */}
                        <div className="flex justify-between relative z-10 px-0">
                          <HorizontalStepper
                            className="justify-self-start items-start"
                            currentStatus={order?.currentStatus}
                            step="pending"
                            date={order?.createdAt as unknown as string}
                          />

                          <HorizontalStepper
                            currentStatus={order?.currentStatus}
                            step="processing"
                            date={order?.processedAt as unknown as string}
                          />

                          <HorizontalStepper
                            currentStatus={order?.currentStatus}
                            step="shipped"
                            date={order?.shippedAt as unknown as string}
                          />

                          <HorizontalStepper
                            className="justify-self-end items-end"
                            currentStatus={order?.currentStatus}
                            step="delivered"
                            date={order?.deliveredAt as unknown as string}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mobile Order Progress Tracker (vertical) */}
                    <div className="md:hidden mb-6">
                      <h4 className="font-medium mb-3">Order Progress</h4>
                      <div className="relative pl-9 overflow-hidden">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-2 top-3 w-0.5 bg-gray-100 rounded-full" />
                        <div
                          className="absolute left-2 top-3 w-0.5 rounded-full transition-all duration-500 bg-primary"
                          style={{
                            height:
                              order?.currentStatus === "pending"
                                ? "0%"
                                : order?.currentStatus === "processing"
                                ? "33.3%"
                                : order?.currentStatus === "shipped"
                                ? "66.6%"
                                : "100%",
                          }}
                        />

                        {/* Vertical Steps */}
                        <div className="space-y-8">
                          {/* Pending Step */}

                          <VerticalStepper
                            currentStatus={order?.currentStatus}
                            step="pending"
                            date={order?.createdAt as unknown as string}
                          />
                          <VerticalStepper
                            currentStatus={order?.currentStatus}
                            step="processing"
                            date={order?.processedAt as unknown as string}
                          />
                          <VerticalStepper
                            currentStatus={order?.currentStatus}
                            step="shipped"
                            date={order?.shippedAt as unknown as string}
                          />
                          <VerticalStepper
                            currentStatus={order?.currentStatus}
                            iconClassName="bottom-0"
                            step="delivered"
                            date={order?.deliveredAt as unknown as string}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <AccordionItem value="items">
                  <AccordionTrigger>
                    Order Items ({order.quantity})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={order?.carSnapshot?.image}
                            alt={order?.carSnapshot?.model}
                            className="h-12 w-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium">
                              {order?.carSnapshot?.brand}{" "}
                              {order?.carSnapshot?.model}
                            </p>
                            <p className="text-gray-500">
                              ${order?.carSnapshot?.price.toFixed(2)} x{" "}
                              {order?.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">
                          ${(order?.unitPrice * order?.quantity).toFixed(2)}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex justify-between pt-2">
                        <p className="font-medium">Total</p>
                        <p className="font-bold">
                          ${order.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="address">
                  <AccordionTrigger>Shipping Address</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-start gap-2">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                      <p>
                        {order.shippingAddress ||
                          "No shipping address available"}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                className="flex items-center gap-2"
                variant={activeTracking === order._id ? "default" : "outline"}
                onClick={() => toggleTracking(order._id)}
              >
                <TruckIcon className="h-4 w-4" />
                {activeTracking === order._id ? "Hide Tracking" : "Track Order"}
              </Button>
            </CardFooter>
          </Card>
        ))}

        {ordersData?.meta && (
          <ViewOrdersPagination
            ordersData={ordersData}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
}

type TStepperProps = {
  currentStatus: OrderStatus;
  step: OrderStatus;
  date: string;
  className?: string;
  iconClassName?: string;
};

const VerticalStepper = ({
  currentStatus,
  step,
  date,
  className,
  iconClassName,
}: TStepperProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      <CircleCheck
        className={cn("absolute left-0", iconClassName)}
        showTick={isStepComplete(currentStatus, step)}
      />
      <div>
        <p className="font-medium capitalize">{step}</p>
        <p className="text-sm text-primary">
          {date && format(new Date(date), "MMM d, yyyy")}
        </p>
      </div>
    </div>
  );
};

const HorizontalStepper = ({
  currentStatus,
  step,
  date,
  className,
  iconClassName,
}: TStepperProps) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <CircleCheck
        className={cn("h-8 w-8", iconClassName)}
        showTick={isStepComplete(currentStatus, step)}
      />
      <span className="text-xs mt-1 font-medium capitalize">{step}</span>
      <span className="text-xs text-primary">
        {date && format(new Date(date), "MMM d, yyyy")}
      </span>
    </div>
  );
};
