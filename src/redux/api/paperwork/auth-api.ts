import { paperworkBaseApi } from "@/redux/api/paperwork/base-api";

const paperworkAuthApi = paperworkBaseApi.injectEndpoints({
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

export const { useLazyMeQuery, useLogoutMutation } = paperworkAuthApi;
