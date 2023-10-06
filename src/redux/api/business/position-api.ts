import { businessBaseApi } from "@/redux/api/business/base-api";
import { position } from "@/types/schema";

const businessPositionApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessPositionGet: builder.query<Array<position>, void>({
      query: () => ({
        url: `position`,
        method: "GET",
      }),
      providesTags: ["Position"],
      transformResponse: (response: ApiResponse<Array<position>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessPositionShow: builder.query<position, string>({
      query: (id) => ({
        url: `position/${id}`,
        method: "GET",
      }),
      providesTags: ["Position"],
      transformResponse: (response: ApiResponse<position>) => response.data,
    }),
    businessPositionStore: builder.mutation<
      ApiResponse<position>,
      Partial<position>
    >({
      query: (payload) => ({
        url: `position`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Position"],
    }),
    businessPositionUpdate: builder.mutation<
      ApiResponse<position>,
      { id: string; payload: Partial<position> }
    >({
      query: ({ id, payload }) => ({
        url: `position/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Position"],
    }),
    businessPositionDelete: builder.mutation<ApiResponse<position>, string>({
      query: (id) => ({
        url: `position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Position"],
    }),
    businessPositionChangeStatus: builder.mutation<
      ApiResponse<position>,
      { id: string; payload: Pick<position, "position_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `position/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Position"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessPositionGetQuery,
  useBusinessPositionShowQuery,
  useLazyBusinessPositionShowQuery,
  useLazyBusinessPositionGetQuery,
  useBusinessPositionStoreMutation,
  useBusinessPositionDeleteMutation,
  useBusinessPositionUpdateMutation,
  useBusinessPositionChangeStatusMutation,
} = businessPositionApi;
