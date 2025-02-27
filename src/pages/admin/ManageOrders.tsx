import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { useNavigate } from "react-router-dom";
import { EditButton } from "../../components/ui/global-buttons";

export default function ManageOrders() {
  const navigate = useNavigate();
  const { data: orders, isLoading, isError } = useGetOrdersQuery();

  const handleEditOrder = (orderId: number) => {
    navigate(`/admin/orders/edit/${orderId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      <div className="space-y-4">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">{order.user}</p>
              <p className="text-sm text-gray-600">
                {order.product} - {order.date}
              </p>
              <p className="text-sm text-gray-600">Status: {order.status}</p>
            </div>
            <div>
              <EditButton onClick={() => handleEditOrder(order.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
