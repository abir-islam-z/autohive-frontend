"use client";

import type React from "react";

import {
  Order,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} from "@/redux/features/order/orderApi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function EditOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: orders } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [formData, setFormData] = useState<Order | null>(null);

  useEffect(() => {
    if (orders) {
      const order = orders?.find((o) => o.id === Number(id));
      if (order) {
        setFormData(order);
      }
    }
  }, [id, orders]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      try {
        await updateOrder(formData).unwrap();
        navigate("/admin/orders");
      } catch (error) {
        console.error("Failed to update the order:", error);
      }
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="user">User</Label>
          <Input
            id="user"
            value={formData.user}
            onChange={(e) => setFormData({ ...formData, user: e.target.value })}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="product">Product</Label>
          <Input
            id="product"
            value={formData.product}
            onChange={(e) =>
              setFormData({ ...formData, product: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as Order["status"],
              })
            }
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
        <div className="mb-4">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <Button type="submit">Update Order</Button>
      </form>
    </div>
  );
}
