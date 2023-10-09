import { paperworkBaseApi } from "@/redux/api/paperwork/base-api";
import { user } from "@/types/schema";

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

export const { useMeQuery, useLazyMeQuery, useLogoutMutation } =
  paperworkAuthApi;
