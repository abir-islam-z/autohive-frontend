import { baseApi } from "@/redux/api";
import { TResponseRedux } from "@/types/global";
import { TUser } from "@/types/user.type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
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
          url: "/users",
          method: "GET",
          params,
          transformResponse: (response: TResponseRedux<TUser[]>) => {
            return {
              data: response.data,
              meta: response.meta,
            };
          },
        };
      },
      providesTags: ["User"],
    }),
    getUserById: builder.query<TResponseRedux<TUser>, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = userApi;
