import { businessBaseApi } from "@/redux/api/business/base-api";
import { organization } from "@/types/schema";

const businessOrganizationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessOrganizationGet: builder.query<organization, void>({
      query: () => ({
        url: `organization`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<organization>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessOrganizationGetQuery,
  useLazyBusinessOrganizationGetQuery,
} = businessOrganizationApi;
