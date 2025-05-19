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
import { badgeColor, cn } from "@/lib/utils";
import { IOrder, ORDER_STATUSES, TOrderStatus } from "@/types/order.type";
import { stepDateMap } from "@/utils/oderUtils";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, TruckIcon } from "lucide-react";
import { HorizontalStepper, VerticalStepper } from "./OrderSteppers";

type OrderCardProps = {
  order: IOrder;
  activeTracking: string | null;
  toggleTracking: (orderId: string) => void;
};

export default function OrderCard({
  order,
  activeTracking,
  toggleTracking,
}: OrderCardProps) {
  return (
    <Card key={order?._id} className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <div className="md:flex md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle className="text-lg">Order #{order?.orderId}</CardTitle>
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
                  <div className="w-full bg-gray-100 h-1.5 absolute top-3 left-0 z-0 rounded-full" />
                  <div
                    className="h-1.5 absolute top-3 left-0 z-0 rounded-full transition-all duration-500 bg-primary"
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
                    {
                      // Render each step
                      ORDER_STATUSES.map((step, index) => (
                        <HorizontalStepper
                          key={step}
                          currentStatus={order?.currentStatus}
                          step={step}
                          date={
                            order[stepDateMap[step as TOrderStatus]] as string
                          }
                          className={cn({
                            "justify-self-start items-start": index === 0,
                            "justify-self-end items-end": index === 3,
                          })}
                        />
                      ))
                    }
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
                    {
                      // Render each step
                      ORDER_STATUSES.map((step) => (
                        <VerticalStepper
                          key={step}
                          currentStatus={order?.currentStatus}
                          step={step}
                          date={
                            order[stepDateMap[step as TOrderStatus]] as string
                          }
                          iconClassName={
                            step === "delivered" ? "bottom-0" : undefined
                          }
                        />
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          <AccordionItem value="items">
            <AccordionTrigger>Order Items ({order.quantity})</AccordionTrigger>
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
                        {order?.carSnapshot?.brand} {order?.carSnapshot?.model}
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
                  <p className="font-bold">${order.totalPrice.toFixed(2)}</p>
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
                  {order.shippingAddress || "No shipping address available"}
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
  );
}
