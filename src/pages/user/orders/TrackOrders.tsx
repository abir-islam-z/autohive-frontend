import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

import { EmptyState } from "@/components/common/EmptyState";
import DashboardPageWrapper from "@/components/DashboardPageWrapper";
import ErrorState from "@/components/errors/ErrorState";
import OrderTrackingPageLoadingSkeleton from "@/components/skeletons/OrderTrackingPageLoadingSkeleton";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import OrderCard from "./OrderCard";
import ViewOrdersPagination from "./ViewOrdersPagination";

export default function ViewOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTracking, setActiveTracking] = useState<string | null>(null);

  const [page, setPage] = useState(
    parseInt(searchParams.get("page") || "1", 10)
  );

  const {
    data: ordersData,
    isLoading,
    error,
    refetch,
  } = useGetUserOrdersQuery({
    page,
    limit: 10,
  });

  const orders = ordersData?.data;

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    setSearchParams(params);
  }, [page, setSearchParams]);

  // Toggle tracking accordion
  const toggleTracking = (orderId: string) => {
    if (activeTracking === orderId) {
      setActiveTracking(null);
    } else {
      setActiveTracking(orderId);
    }
  };

  if (isLoading) {
    return (
      <DashboardPageWrapper pageHeading="Track My Orders">
        <OrderTrackingPageLoadingSkeleton />
      </DashboardPageWrapper>
    );
  }

  if (error) {
    return (
      <DashboardPageWrapper pageHeading="Track My Orders">
        <ErrorState
          title="Error"
          message="Failed to load orders. Please try again later."
          onRetry={() => refetch()}
        />
      </DashboardPageWrapper>
    );
  }

  if (!orders?.length) {
    return (
      <DashboardPageWrapper pageHeading="Track My Orders">
        <EmptyState
          title="No orders yet"
          description="When you place orders, they will appear here"
          actionLabel="Continue Shopping"
          onAction={() => navigate("/products")}
        />
      </DashboardPageWrapper>
    );
  }

  return (
    <DashboardPageWrapper pageHeading="Track My Orders">
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            activeTracking={activeTracking}
            toggleTracking={toggleTracking}
          />
        ))}

        {ordersData?.meta && (
          <ViewOrdersPagination
            ordersData={ordersData}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </DashboardPageWrapper>
  );
}
