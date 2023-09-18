import { mainApi } from "@/redux/api/main-api";

const securityApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    securityChangePassword: builder.mutation<user, any>({
      query: (payload) => ({
        url: `security/change-password`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: ApiResponse<user>) => response.data,
      transformErrorResponse: (response) => response,
    }),
  }),
  overrideExisting: false,
});

export const { useSecurityChangePasswordMutation } = securityApi;
