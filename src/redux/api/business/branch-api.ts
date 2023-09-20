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
    businessBranchShow: builder.query<branch, string>({
      query: (id) => ({
        url: `branch/${id}`,
        method: "GET",
      }),
      providesTags: ["Branch"],
      transformResponse: (response: ApiResponse<branch>) => response.data,
    }),
    businessBranchStore: builder.mutation<ApiResponse<branch>, Partial<branch>>(
      {
        query: (payload) => ({
          url: `branch`,
          method: "POST",
          body: payload,
        }),
        invalidatesTags: ["Branch"],
      }
    ),
    businessBranchUpdate: builder.mutation<
      ApiResponse<branch>,
      { id: string; payload: Partial<branch> }
    >({
      query: ({ id, payload }) => ({
        url: `branch/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Branch"],
    }),
    businessBranchDelete: builder.mutation<ApiResponse<branch>, string>({
      query: (id) => ({
        url: `branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Branch"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessBranchGetBranchesQuery,
  useBusinessBranchShowQuery,
  useLazyBusinessBranchShowQuery,
  useLazyBusinessBranchGetBranchesQuery,
  useBusinessBranchStoreMutation,
  useBusinessBranchDeleteMutation,
  useBusinessBranchUpdateMutation,
} = businessBranchApi;
