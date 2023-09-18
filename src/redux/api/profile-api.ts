import { mainApi } from "@/redux/api/main-api";

const profileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    profileUpdate: builder.mutation<user, any>({
      query: (payload) => ({
        url: `profile`,
        method: "PUT",
        body: payload,
      }),
      transformResponse: (response: ApiResponse<user>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const { useProfileUpdateMutation } = profileApi;
