import { mainApi } from "@/redux/api/main-api";

const userSecurityApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    userSecurityChangePassword: builder.mutation<
      ApiResponse<user>,
      { user_id?: string; payload: any }
    >({
      query: ({ user_id, payload }) => ({
        url: `superadmin/manage-user/security/${user_id}/change-password`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUserSecurityChangePasswordMutation } = userSecurityApi;
