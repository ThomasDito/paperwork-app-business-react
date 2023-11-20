import { businessBaseApi } from "@/redux/api/business/base-api";
import { application } from "@/types/schema";

const businessApplicationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessApplicationGet: builder.query<
      Array<application>,
      "all" | "installed" | "not-installed" | undefined
    >({
      query: (type) => ({
        url: `business/application/${type}`,
        method: "GET",
      }),
      providesTags: ["Application"],
      transformResponse: (response: ApiResponse<Array<application>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),

    businessApplicationInstall: builder.mutation<
      ApiResponse<application>,
      string
    >({
      query: (id) => ({
        url: `business/application/${id}/install`,
        method: "POST",
      }),
      invalidatesTags: ["Application"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessApplicationGetQuery,
  useLazyBusinessApplicationGetQuery,
  useBusinessApplicationInstallMutation,
} = businessApplicationApi;
