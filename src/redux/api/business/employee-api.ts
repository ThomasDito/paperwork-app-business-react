import { businessBaseApi } from "@/redux/api/business/base-api";
import {
  branch,
  division,
  employee,
  employee_status,
  level,
  position,
} from "@/types/schema";

const businessEmployeeApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEmployeeGet: builder.query<
      ApiResponse<
        Array<
          employee & {
            division: division;
            branch: branch;
            level: level;
            employee_status: employee_status;
            position: position;
          }
        >
      >,
      PaginationParams<employee> | void
    >({
      query: (params) => ({
        url: `employee`,
        method: "GET",
        params: typeof params === "object" ? params : undefined,
      }),
      providesTags: ["Employee"],
    }),
    businessEmployeeShow: builder.query<employee, string>({
      query: (id) => ({
        url: `employee/${id}`,
        method: "GET",
      }),
      providesTags: ["Employee"],
      transformResponse: (response: ApiResponse<employee>) => response.data,
    }),
    businessEmployeeStore: builder.mutation<
      ApiResponse<employee>,
      Partial<employee>
    >({
      query: (payload) => ({
        url: `employee`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_, error) =>
        !error ? ["Employee", "Division", "Employee Status"] : [],
    }),
    businessEmployeeUpdate: builder.mutation<
      ApiResponse<employee>,
      { id: string; payload: Partial<employee> }
    >({
      query: ({ id, payload }) => ({
        url: `employee/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_, error) =>
        !error ? ["Employee", "Division", "Employee Status"] : [],
    }),
    businessEmployeeDelete: builder.mutation<ApiResponse<employee>, string>({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) =>
        !error ? ["Employee", "Division", "Employee Status"] : [],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEmployeeGetQuery,
  useBusinessEmployeeShowQuery,
  useLazyBusinessEmployeeShowQuery,
  useLazyBusinessEmployeeGetQuery,
  useBusinessEmployeeStoreMutation,
  useBusinessEmployeeDeleteMutation,
  useBusinessEmployeeUpdateMutation,
} = businessEmployeeApi;
