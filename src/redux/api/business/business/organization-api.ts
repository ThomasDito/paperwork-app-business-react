import { businessBaseApi } from "@/redux/api/business/base-api";
import { organization } from "@/types/schema";

const businessOrganizationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessOrganizationGet: builder.query<organization, void>({
      query: () => ({
        url: `business/organization`,
        method: "GET",
      }),
      providesTags: ["Organization"],
      transformResponse: (response: ApiResponse<organization>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessOrganizationUpdate: builder.mutation<
      ApiResponse<organization>,
      Partial<organization>
    >({
      query: (body) => ({
        url: `business/organization`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Organization"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessOrganizationGetQuery,
  useLazyBusinessOrganizationGetQuery,
  useBusinessOrganizationUpdateMutation,
} = businessOrganizationApi;
