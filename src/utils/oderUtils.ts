import { IOrder, TOrderStatus } from "@/types/order.type";

export const stepDateMap: Record<TOrderStatus, keyof IOrder> = {
  pending: "createdAt",
  processing: "processedAt",
  shipped: "shippedAt",
  delivered: "deliveredAt",
};
