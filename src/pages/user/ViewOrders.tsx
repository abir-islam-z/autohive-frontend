/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, PackageIcon, TruckIcon } from "lucide-react";

export default function ViewOrders() {
  const { data: ordersData, isLoading, error } = useGetOrdersQuery();
  const orders = ordersData?.data || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-500";
      case "shipped":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
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
        {orders.map((order) => (
          <Card key={order?._id} className="overflow-hidden">
            <CardHeader className="bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-lg">Order #{order?._id}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <CalendarIcon className="h-4 w-4" />
                    {format(new Date(order.createdAt), "PP")}
                  </CardDescription>
                </div>
                <Badge
                  className={`${getStatusColor(
                    order?.currentStatus
                  )} mt-2 md:mt-0`}
                  variant="outline"
                >
                  {order?.currentStatus}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="items">
                  <AccordionTrigger>
                    Order Items ({order.quantity})
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {order?.car?.map((item: any) => (
                        <div
                          key={item._id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-12 w-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-gray-500">
                                ${item.price.toFixed(2)} x {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
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
              <Button className="flex items-center gap-2" variant="outline">
                <TruckIcon className="h-4 w-4" />
                Track Order
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
