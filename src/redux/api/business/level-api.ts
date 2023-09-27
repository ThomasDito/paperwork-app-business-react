import { businessBaseApi } from "@/redux/api/business/base-api";
import { level } from "@/types/schema";

const businessLevelApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessLevelGet: builder.query<Array<level>, void>({
      query: () => ({
        url: `level`,
        method: "GET",
      }),
      providesTags: ["Level"],
      transformResponse: (response: ApiResponse<Array<level>>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessLevelShow: builder.query<level, string>({
      query: (id) => ({
        url: `level/${id}`,
        method: "GET",
      }),
      providesTags: ["Level"],
      transformResponse: (response: ApiResponse<level>) => response.data,
    }),
    businessLevelStore: builder.mutation<ApiResponse<level>, Partial<level>>({
      query: (payload) => ({
        url: `level`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Level"],
    }),
    businessLevelUpdate: builder.mutation<
      ApiResponse<level>,
      { id: string; payload: Partial<level> }
    >({
      query: ({ id, payload }) => ({
        url: `level/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Level"],
    }),
    businessLevelDelete: builder.mutation<ApiResponse<level>, string>({
      query: (id) => ({
        url: `level/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Level"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessLevelGetQuery,
  useBusinessLevelShowQuery,
  useLazyBusinessLevelShowQuery,
  useLazyBusinessLevelGetQuery,
  useBusinessLevelStoreMutation,
  useBusinessLevelDeleteMutation,
  useBusinessLevelUpdateMutation,
} = businessLevelApi;
