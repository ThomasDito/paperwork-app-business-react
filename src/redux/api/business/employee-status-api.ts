import { businessBaseApi } from "@/redux/api/business/base-api";
import { employee_status } from "@/types/schema";

const businessEmployeeStatusApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEmployeeStatusGet: builder.query<Array<employee_status>, void>({
      query: () => ({
        url: `employee-status`,
        method: "GET",
      }),
      providesTags: ["Employee Status"],
      transformResponse: (response: ApiResponse<Array<employee_status>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessEmployeeStatusShow: builder.query<employee_status, string>({
      query: (id) => ({
        url: `employee-status/${id}`,
        method: "GET",
      }),
      providesTags: ["Employee Status"],
      transformResponse: (response: ApiResponse<employee_status>) =>
        response.data,
    }),
    businessEmployeeStatusStore: builder.mutation<
      ApiResponse<employee_status>,
      Partial<employee_status>
    >({
      query: (payload) => ({
        url: `employee-status`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Employee Status"],
    }),
    businessEmployeeStatusUpdate: builder.mutation<
      ApiResponse<employee_status>,
      { id: string; payload: Partial<employee_status> }
    >({
      query: ({ id, payload }) => ({
        url: `employee-status/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employee Status"],
    }),
    businessEmployeeStatusDelete: builder.mutation<
      ApiResponse<employee_status>,
      string
    >({
      query: (id) => ({
        url: `employee-status/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee Status"],
    }),
    businessEmployeeStatusChangeStatus: builder.mutation<
      ApiResponse<employee_status>,
      { id: string; payload: Pick<employee_status, "employee_status_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `employee-status/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Employee Status"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEmployeeStatusGetQuery,
  useBusinessEmployeeStatusShowQuery,
  useLazyBusinessEmployeeStatusShowQuery,
  useLazyBusinessEmployeeStatusGetQuery,
  useBusinessEmployeeStatusStoreMutation,
  useBusinessEmployeeStatusDeleteMutation,
  useBusinessEmployeeStatusUpdateMutation,
  useBusinessEmployeeStatusChangeStatusMutation,
} = businessEmployeeStatusApi;
