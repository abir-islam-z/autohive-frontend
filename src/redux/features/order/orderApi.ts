import { baseApi } from "@/redux/api";

export interface Order {
  id: number;
  user: string;
  product: string;
  status: "Pending" | "Shipped" | "Delivered";
  date: string;
}

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => ({
        url: "/orders",
      }),
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<Order, string>({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<void, void>({
      query: () => ({
        url: "/orders",
        method: "POST",
      }),
    }),
    updateOrder: builder.mutation<Order, Partial<Order>>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
