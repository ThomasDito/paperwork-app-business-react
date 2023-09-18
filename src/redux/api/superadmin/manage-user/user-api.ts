import { ProfileUpdateSchemaType } from "@/pages/user/tabs/user";
import { mainApi } from "@/redux/api/main-api";

const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      ApiResponse<
        Array<
          user & {
            _count: {
              user_organizations: number;
            };
          }
        >
      >,
      PaginationParams<user>
    >({
      query: (params) => ({
        url: `superadmin/manage-user/user`,
        method: "GET",
        params,
      }),
    }),
    showUser: builder.query<user, string | undefined>({
      query: (id) => ({
        url: `superadmin/manage-user/user/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<user>) => response.data,
    }),
    updateUser: builder.mutation<
      ApiResponse<user>,
      { id?: string; payload: ProfileUpdateSchemaType }
    >({
      query: ({ id, payload }) => ({
        url: `superadmin/manage-user/user/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    changeStatusUser: builder.mutation<ApiResponse<unknown>, string>({
      query: (id) => ({
        url: `superadmin/manage-user/user/${id}/change-status`,
        method: "PUT",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLazyGetUsersQuery,
  useChangeStatusUserMutation,
  useUpdateUserMutation,
  useShowUserQuery,
  useLazyShowUserQuery,
} = userApi;
