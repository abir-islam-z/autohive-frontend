import { useState } from "react";

interface Order {
  id: number;
  product: string;
  date: string;
  status: string;
}

export default function ViewOrders() {
  const [orders] = useState<Order[]>([
    {
      id: 1,
      product: "Tesla Model 3",
      date: "2023-05-01",
      status: "Delivered",
    },
    { id: 2, product: "Ford Mustang", date: "2023-05-15", status: "Shipped" },
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">{order.product}</p>
              <p className="text-sm text-gray-600">
                Date: {order.date} | Status: {order.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
