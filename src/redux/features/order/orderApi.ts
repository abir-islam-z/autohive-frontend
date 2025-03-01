/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api";
import { TResponseRedux } from "@/types/global";
import { ICreateOrderData, IOrder, IUpdateOrderData } from "@/types/order.type";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          console.log(args);
          for (const [key, value] of Object.entries(args)) {
            if (value) {
              if (Array.isArray(value)) {
                value.forEach((val) => {
                  params.append(key, val);
                });
              } else {
                params.append(key, value as string);
              }
            }
          }
        }
        return {
          url: "orders",
          method: "GET",
          params,
        };
      },
      providesTags: ["Order"],
      transformResponse: (response: TResponseRedux<IOrder[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getOrderById: builder.query<TResponseRedux<IOrder>, string>({
      query: (id) => ({ url: `/orders/${id}` }),
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<any, ICreateOrderData>({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
    }),
    updateOrder: builder.mutation<any, IUpdateOrderData>({
      query: ({ id, ...body }) => ({
        url: `/orders/${id}`,
        method: "PATCH",
        body,
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
