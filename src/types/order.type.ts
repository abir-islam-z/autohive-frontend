// ["pending", "processing", "shipped", "delivered"];

import { CAR_CATEGORY } from "@/lib/const";

// Order status options
export const ORDER_STATUSES = [
  "pending",
  "processing",
  "shipped",
  "delivered",
] as TOrderStatus[];

export interface IPayment {
  id: string;
  transactionStatus: string;
  bank_status: string;
  sp_code: string;
  sp_message: string;
  method: string;
  date_time: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export type TOrderStatus = "pending" | "processing" | "shipped" | "delivered";

export interface IOrder {
  _id: string;
  orderId: string;
  phone: string;
  email: string;
  car: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  currentStatus: TOrderStatus;
  user: IUser;
  shippingAddress: string;
  payment: IPayment;
  isDeleted: boolean;
  deliveryDate: string;
  processedAt: Date;
  shippedAt: Date;
  deliveredAt: Date;
  createdAt: string;
  updatedAt: Date;
  carSnapshot: {
    brand: string;
    model: string;
    year: number;
    price: number;
    category: keyof typeof CAR_CATEGORY;
    description: string;
    image: string;
    currency: string;
  };
}

export interface ICreateOrderData {
  email: string;
  phone: string;
  car: string;
  quantity: number;
  shippingAddress: string;
}

export interface IUpdateOrderData {
  id: string;
  currentStatus: string;
  deliveryDate: string;
}
