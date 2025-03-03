import { baseApi } from "@/redux/api";
import { TCreateCar } from "@/schema/add-car.schema";
import { TResponse, TResponseRedux } from "@/types/global";

type TCar = {
  readonly _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  currency: string;
  quantity: number;
  inStock: boolean;
  image: string;
};

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
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
          url: "/cars",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TCar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["Car"],
    }),
    getCarById: builder.query<TResponseRedux<TCar>, string>({
      query: (id) => ({ url: `/cars/${id}` }),
      providesTags: ["Car"],
    }),
    createCar: builder.mutation<TResponseRedux<TResponse<unknown>>, TCreateCar>(
      {
        query: (car) => {
          // file upload
          const formData = new FormData();
          formData.append("brand", car.brand);
          formData.append("model", car.model);
          formData.append("year", String(car.year));
          formData.append("price", String(car.price));
          formData.append("category", car.category);
          formData.append("description", car.description);
          formData.append("quantity", String(car.quantity));
          formData.append("currency", String(car.currency));
          formData.append("image", car.image);

          return {
            url: "/cars",
            method: "POST",
            body: formData,
          };
        },
      }
    ),
    updateCar: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body,
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
