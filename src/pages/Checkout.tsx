"use client";

import type React from "react";

import { IOrder } from "@/types/order.type";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock function to simulate SurjoPay integration
const initiateSurjoPayPayment = async (orderDetails: any) => {
  // In a real implementation, this would communicate with SurjoPay's API
  console.log("Initiating SurjoPay payment:", orderDetails);
  // Simulate a successful payment after 2 seconds
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    success: true,
    transactionId: "SURJO-" + Math.random().toString(36).substr(2, 9),
  };
};

export default function Checkout() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState<IOrder[]>([]);

  const totalPrice = 0;

  const handleQuantityChange = (productId: number, newQuantity: number) => {};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderDetails = {
      items: cartItems,
      totalPrice,
      customerName: name,
      customerEmail: email,
      shippingAddress: address,
      paymentMethod,
    };

    try {
      const paymentResult = await initiateSurjoPayPayment(orderDetails);
      if (paymentResult.success) {
        // In a real app, you would save the order to your backend here
        console.log("Order placed successfully:", {
          ...orderDetails,
          transactionId: paymentResult.transactionId,
        });
        alert("Order placed successfully!");
        navigate("/"); // Redirect to home page or order confirmation page
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert(
        "An error occurred while processing your payment. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      Checkout page content goes here
      {/* <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.brand} {item.model}
              </span>
              <div>
                <input
                  type="number"
                  min="1"
                  max={item.quantity}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      Number.parseInt(e.target.value)
                    )
                  }
                  className="w-16 px-2 py-1 border rounded mr-2"
                />
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold mt-4">
            Total: ${totalPrice.toLocaleString()}
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="name">Full Name</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="address">Shipping Address</Label>
          <Input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Select onValueChange={setPaymentMethod} required>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="debit_card">Debit Card</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">
          Order Now
        </Button>
      </form> */}
    </div>
  );
}
