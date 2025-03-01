/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { badgeColor, cn, formatDate, shapeError } from "@/lib/utils";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { OrderStatus } from "@/types/order.type";
import { format } from "date-fns"; // Add this import for date formatting
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

// Order status options
const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered"];

const isOptionDisabled = (status: string, currentStatus: string) => {
  switch (status) {
    case "pending":
      return currentStatus !== "pending";
    case "processing":
      return ["shipped", "delivered"].includes(currentStatus);
    case "shipped":
      return currentStatus === "pending";
    case "delivered":
      return !["shipped"].includes(currentStatus);
    default:
      return false;
  }
};

export default function EditOrder() {
  const { orderId: id } = useParams<{ orderId: string }>();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id!);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [status, setStatus] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString()
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (order) {
      setStatus(order?.data?.currentStatus!);

      // Format the delivery date for the input field if it exists
      if (order?.data?.deliveryDate) {
        const date = new Date(order.data.deliveryDate);
        setDeliveryDate(format(date, "yyyy-MM-dd"));
      }
    }
  }, [order]);

  const handleUpdateStatus = async () => {
    const toastId = toast.loading("Updating order...");
    try {
      await updateOrder({
        id: order?.data?._id!,
        currentStatus: status as any,
        deliveryDate: deliveryDate && new Date(deliveryDate).toISOString(),
      }).unwrap();
      toast.success("Order updated successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate("/dashboard/manage-orders");
    } catch (error) {
      toast.error(shapeError(error), {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">Loading order details...</div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error loading order details
      </div>
    );
  }

  // when payment is not processed and delivered update is disabled
  const isPaymentPending = order?.data?.payment.transactionStatus !== "success";
  const isDelivered = order?.data?.currentStatus === "delivered";

  const isDisabled = isPaymentPending || isDelivered;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Edit Order</h2>

      <Card>
        <CardHeader>
          <CardTitle>Order #{order?.data?.orderId}</CardTitle>
          <CardDescription>
            Created on {formatDate(order?.data?.createdAt!)} • Status:{" "}
            <span className="font-medium capitalize">
              <Badge
                className={cn(
                  "capitalize",
                  badgeColor[order?.data?.currentStatus as OrderStatus]
                )}
              >
                {order?.data?.currentStatus}
              </Badge>
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Customer Details</h3>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {order?.data?.user.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {order?.data?.email}
              </p>
              <p>
                <span className="font-medium">Shipping Address:</span>{" "}
                {order?.data?.shippingAddress}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Order Details</h3>
              <p>
                <span className="font-medium">Car:</span>{" "}
                {order?.data?.car.brand} {order?.data?.car.model}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {order?.data?.quantity}
              </p>
              <p>
                <span className="font-medium">Total Price:</span> $
                {order?.data?.totalPrice.toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {order?.data?.payment.transactionStatus}
              </p>
              <p>
                <span className="font-medium">Expected Delivery:</span>{" "}
                {formatDate(order?.data?.deliveryDate!)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Update Order Status</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[240px]" disabled={isDisabled}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((statusOption) => (
                      <SelectItem
                        key={statusOption}
                        value={statusOption}
                        disabled={isOptionDisabled(
                          statusOption,
                          order?.data?.currentStatus!
                        )}
                      >
                        {statusOption.charAt(0).toUpperCase() +
                          statusOption.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="deliveryDate" className="text-sm font-medium">
                  Estimated Delivery Date
                </label>

                <DatePicker
                  date={new Date(formatDate(deliveryDate))}
                  onSelect={(val) => {
                    setDeliveryDate(val?.toISOString()!);
                  }}
                  isDisabled={isDisabled}
                />

                <p className="text-xs text-gray-500">
                  Current expected delivery:{" "}
                  {formatDate(order?.data?.deliveryDate!)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/manage-orders")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={
              isUpdating ||
              (status === order?.data?.currentStatus &&
                deliveryDate ===
                  format(new Date(order?.data?.deliveryDate!), "yyyy-MM-dd"))
            }
          >
            {isUpdating ? "Updating..." : "Update Order"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
