import { mainApi } from "@/redux/api/main-api";

const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<user, void>({
      query: () => ({
        url: `auth/me`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<user>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    logout: builder.mutation<unknown, void>({
      query: () => ({
        url: `auth/logout`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyMeQuery, useLogoutMutation } = authApi;
