import { businessBaseApi } from "@/redux/api/business/base-api";

const businessDivisionApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessDivisionGet: builder.query<Array<division>, void>({
      query: () => ({
        url: `division`,
        method: "GET",
      }),
      providesTags: ["Division"],
      transformResponse: (response: ApiResponse<Array<division>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessDivisionShow: builder.query<division, string>({
      query: (id) => ({
        url: `division/${id}`,
        method: "GET",
      }),
      providesTags: ["Division"],
      transformResponse: (response: ApiResponse<division>) => response.data,
    }),
    businessDivisionStore: builder.mutation<
      ApiResponse<division>,
      Partial<division>
    >({
      query: (payload) => ({
        url: `division`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Division"],
    }),
    businessDivisionUpdate: builder.mutation<
      ApiResponse<division>,
      { id: string; payload: Partial<division> }
    >({
      query: ({ id, payload }) => ({
        url: `division/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Division"],
    }),
    businessDivisionChangeStatus: builder.mutation<
      ApiResponse<division>,
      { id: string; payload: Pick<division, "division_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `division/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Division"],
    }),
    businessDivisionDelete: builder.mutation<ApiResponse<division>, string>({
      query: (id) => ({
        url: `division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessDivisionGetQuery,
  useBusinessDivisionShowQuery,
  useLazyBusinessDivisionShowQuery,
  useLazyBusinessDivisionGetQuery,
  useBusinessDivisionStoreMutation,
  useBusinessDivisionDeleteMutation,
  useBusinessDivisionUpdateMutation,
  useBusinessDivisionChangeStatusMutation,
} = businessDivisionApi;
