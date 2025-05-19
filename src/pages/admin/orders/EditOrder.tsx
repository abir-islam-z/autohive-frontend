"use client";

import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import  ErrorState  from "@/components/errors/ErrorState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import { getErrorMessage } from "@/lib/getErrorMessage";
import { badgeColor, cn, formatDate } from "@/lib/utils";
import {
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { ORDERS_PATH } from "@/routes/admin.route";
import { ORDER_STATUSES, TOrderStatus } from "@/types/order.type";
import { format } from "date-fns";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import EditOrderSkeleton from "../../../components/skeletons/EditOrderSkeleton";

const isOptionDisabled = (status: string, currentStatus: string) => {
  // Order flow: pending -> processing -> shipped -> delivered
  const statusOrder = ["pending", "processing", "shipped", "delivered"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  const optionIndex = statusOrder.indexOf(status);

  // Can't go backwards or skip steps
  if (optionIndex < currentIndex) return true;
  if (optionIndex > currentIndex + 1) return true;

  return false;
};

export default function EditOrder() {
  const { orderId: id } = useParams<{ orderId: string }>();
  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useGetOrderByIdQuery(id!);
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();
  const [status, setStatus] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (order?.data) {
      setStatus(order.data.currentStatus || "pending");

      if (order.data.deliveryDate) {
        try {
          const date = new Date(order.data.deliveryDate);
          setDeliveryDate(format(date, "yyyy-MM-dd"));
        } catch (error) {
          console.error("Invalid date format:", error);
          setDeliveryDate(format(new Date(), "yyyy-MM-dd"));
        }
      } else {
        setDeliveryDate(format(new Date(), "yyyy-MM-dd"));
      }
    }
  }, [order]);

  const handleUpdateStatus = async () => {
    if (!order?.data || !deliveryDate) return;

    const toastId = toast.loading("Updating order...");
    try {
      await updateOrder({
        id: order.data._id,
        currentStatus: status as TOrderStatus,
        deliveryDate: deliveryDate && new Date(deliveryDate).toISOString(),
      }).unwrap();

      toast.success("Order updated successfully", {
        id: toastId,
        duration: 2000,
      });
      navigate(ORDERS_PATH);
    } catch (error) {
      toast.error(getErrorMessage(error), {
        id: toastId,
        duration: 2000,
      });
    }
  };

  // Determine if updates are disabled
  const isPaymentPending = order?.data?.payment.transactionStatus !== "success";
  const isDelivered = order?.data?.currentStatus === "delivered";
  const isDisabled = isPaymentPending || isDelivered;

  // Check if form has changed from original values
  const hasChanges =
    order?.data &&
    (status !== order.data.currentStatus ||
      (deliveryDate &&
        deliveryDate !==
          format(
            new Date(order.data.deliveryDate || new Date()),
            "yyyy-MM-dd"
          )));

  // Render different content based on loading/error states
  let content;
  if (isLoading) {
    content = <EditOrderSkeleton />;
  } else if (isError || !order?.data) {
    content = (
      <ErrorState
        title="Failed to Load Order"
        message="We couldn't retrieve the order details. Please try again."
        onRetry={() => refetch()}
      />
    );
  } else {
    const { data: orderData } = order;

    content = (
      <Card>
        <CardHeader>
          <CardTitle>Order #{orderData.orderId}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            Created on {formatDate(orderData.createdAt)} • Status:{" "}
            <Badge
              className={cn(
                "capitalize",
                badgeColor[orderData.currentStatus as TOrderStatus]
              )}
            >
              {orderData.currentStatus}
            </Badge>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Display alerts for special conditions */}
          {isPaymentPending && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Payment Pending</AlertTitle>
              <AlertDescription>
                Order status cannot be updated until payment is completed.
              </AlertDescription>
            </Alert>
          )}

          {isDelivered && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Order Delivered</AlertTitle>
              <AlertDescription>
                This order has been marked as delivered and cannot be modified
                further.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details */}
            <div>
              <h3 className="text-lg font-medium mb-2">Customer Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {orderData.user.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {orderData.email}
                </p>
                <p>
                  <span className="font-medium">Shipping Address:</span>{" "}
                  {orderData.shippingAddress}
                </p>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h3 className="text-lg font-medium mb-2">Order Details</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Car:</span>{" "}
                  {orderData.carSnapshot.brand} {orderData.carSnapshot.model}
                </p>
                <p>
                  <span className="font-medium">Quantity:</span>{" "}
                  {orderData.quantity}
                </p>
                <p>
                  <span className="font-medium">Total Price:</span> $
                  {orderData.totalPrice.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Payment Status:</span>{" "}
                  {/* Need to Change this later */}
                  <Badge
                    className={
                      badgeColor[
                        orderData.payment
                          .transactionStatus as unknown as TOrderStatus
                      ]
                    }
                  >
                    {orderData.payment.transactionStatus}
                  </Badge>
                </p>
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {formatDate(orderData.deliveryDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-3">Update Order Status</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Select
                  value={status}
                  onValueChange={setStatus}
                  disabled={isDisabled}
                >
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {ORDER_STATUSES.map((statusOption) => (
                      <SelectItem
                        key={statusOption}
                        value={statusOption}
                        disabled={isOptionDisabled(
                          statusOption,
                          orderData.currentStatus
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
                  date={deliveryDate ? new Date(deliveryDate) : undefined}
                  onSelect={(val) => {
                    if (val) setDeliveryDate(format(val, "yyyy-MM-dd"));
                  }}
                />

                <p className="text-xs text-muted-foreground">
                  Current Estimated delivery:{" "}
                  {formatDate(orderData.deliveryDate)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(ORDERS_PATH)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateStatus}
            disabled={isUpdating || isDisabled || !hasChanges}
          >
            {isUpdating ? "Updating..." : "Update Order"}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <DashboardPageWrapper pageHeading="Edit Order">
      {content}
    </DashboardPageWrapper>
  );
}
