import { baseApi } from "@/redux/api";
import { TCreateCar } from "@/schema/add-car.schema";
import { TBrandsModels, TCar } from "@/types/car.type";
import { TResponse, TResponseRedux } from "@/types/global";
import { serialize } from "object-to-formdata";

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
          /* const formData = new FormData();
          formData.append("brand", car.brand);
          formData.append("model", car.model);
          formData.append("year", String(car.year));
          formData.append("price", String(car.price));
          formData.append("category", car.category);
          formData.append("description", car.description);
          formData.append("quantity", String(car.quantity));
          formData.append("currency", String(car.currency));
          if (Array.isArray(car.images)) {
            car.images.forEach((file) => {
              formData.append("images", file);
            });
          } else {
            // Fallback for when it's a single file
            formData.append("images", car.images as File);
          }
          formData.append("transmission", car.transmission);
          formData.append("fuelType", car.fuelType);
          formData.append("driveType", car.driveType);
          formData.append("mileage", String(car.mileage));
          formData.append("horsepower", String(car.horsepower));
          formData.append("engine", car.engine);
          formData.append("color", car.color); */

          // Extract images from body
          const { images, ...restBody } = car;

          // Create FormData and serialize the non-file fields
          const formData = serialize(restBody, { indices: false });

          // Manually add images with the exact key name you want
          if (images && Array.isArray(images)) {
            images.forEach((image) => {
              formData.append("images", image);
            });
          }

          return {
            url: "/cars",
            method: "POST",
            body: formData,
          };
        },
      }
    ),
    updateCar: builder.mutation({
      query: ({ id, ...body }) => {
        // Extract images from body
        const { images, ...restBody } = body;

        // Create FormData and serialize the non-file fields
        const formData = serialize(restBody, { indices: false });

        // Manually add images with the exact key name you want
        if (images && Array.isArray(images)) {
          images.forEach((image) => {
            formData.append("images", image);
          });
        }
        return {
          url: `/cars/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Car"],
    }),
    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Car"],
    }),
    getBrands: builder.query<TResponseRedux<TBrandsModels>, void>({
      query: () => ({ url: "/cars/brands" }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useGetBrandsQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
} = carApi;
