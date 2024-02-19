import { businessBaseApi } from "@/redux/api/business/base-api";
import { application } from "@/types/schema";

const businessMemberApplicationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessMemberApplicationGet: builder.query<Array<application>, void>({
      query: () => ({
        url: `member/application`,
        method: "GET",
      }),
      providesTags: ["Member/Application"],
      transformResponse: (response: ApiResponse<Array<application>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyBusinessMemberApplicationGetQuery,
  useBusinessMemberApplicationGetQuery,
} = businessMemberApplicationApi;
