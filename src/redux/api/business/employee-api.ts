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
      Array<
        employee & {
          division: division;
          branch: branch;
          level: level;
          employee_status: employee_status;
          position: position;
        }
      >,
      void
    >({
      query: () => ({
        url: `employee`,
        method: "GET",
      }),
      providesTags: ["Employee"],
      transformResponse: (
        response: ApiResponse<
          Array<
            employee & {
              division: division;
              branch: branch;
              level: level;
              employee_status: employee_status;
              position: position;
            }
          >
        >
      ) => response.data,
      transformErrorResponse: (response) => response.data,
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
      invalidatesTags: ["Employee"],
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
      invalidatesTags: ["Employee"],
    }),
    businessEmployeeDelete: builder.mutation<ApiResponse<employee>, string>({
      query: (id) => ({
        url: `employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
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
