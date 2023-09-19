import { businessBaseApi } from "@/redux/api/business/base-api";

const businessBranchApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessBranchGetBranches: builder.query<Array<branch>, void>({
      query: () => ({
        url: `branch`,
        method: "GET",
      }),
      providesTags: ["Branch"],
      transformResponse: (response: ApiResponse<Array<branch>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessBranchStore: builder.mutation<ApiResponse<branch>, any>({
      query: (payload) => ({
        url: `branch`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyBusinessBranchGetBranchesQuery,
  useBusinessBranchStoreMutation,
} = businessBranchApi;
