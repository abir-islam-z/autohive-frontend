import { baseApi } from "@/redux/api";

type TCar = {
  readonly _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  quantity: number;
  inStock: boolean;
  image: string;
};

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<TCar[], void>({
      query: () => ({
        url: "/cars",
      }),
      providesTags: ["Car"],
    }),
    getCarById: builder.query<TCar, string>({
      query: (id) => ({ url: `/cars/${id}` }),
      providesTags: ["Car"],
    }),
    createCar: builder.mutation({
      query: (car) => ({
        url: "/cars",
        method: "POST",
        body: car,
      }),
    }),
    updateCar: builder.mutation({
      query: (car) => ({
        url: `/cars/${car.id}`,
        method: "PATCH",
        body: car,
      }),
      invalidatesTags: ["Car"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
