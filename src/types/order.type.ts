// ["pending", "processing", "shipped", "delivered"];
export interface IPayment {
  _id: string;
  transactionStatus: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}

export interface ICar {
  _id: string;
  brand: string;
  model: string;
  id: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface IOrder {
  _id: string;
  orderId: string;
  phone: string;
  email: string;
  car: ICar;
  quantity: number;
  totalPrice: number;
  currentStatus: OrderStatus;
  user: IUser;
  shippingAddress: string;
  payment: IPayment;
  isDeleted: boolean;
  deliveryDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
