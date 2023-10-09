import { businessBaseApi } from "@/redux/api/business/base-api";
import { employee, role_item_type } from "@/types/schema";

const businessEmployeeAccountApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEmployeeAccountEmployee: builder.query<employee, void>({
      query: () => ({
        url: `employee/account/employee`,
        method: "GET",
      }),
      providesTags: ["Employee/Account"],
      transformResponse: (response: ApiResponse<employee>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessEmployeeAccountModules: builder.query<
      Array<{ module_key: string; permission: role_item_type }>,
      void
    >({
      query: () => ({
        url: `employee/account/modules`,
        method: "GET",
      }),
      providesTags: ["Employee/Account"],
      transformResponse: (
        response: ApiResponse<
          Array<{ module_key: string; permission: role_item_type }>
        >
      ) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEmployeeAccountEmployeeQuery,
  useBusinessEmployeeAccountModulesQuery,
  useLazyBusinessEmployeeAccountEmployeeQuery,
  useLazyBusinessEmployeeAccountModulesQuery,
} = businessEmployeeAccountApi;
