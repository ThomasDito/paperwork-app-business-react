import { businessBaseApi } from "@/redux/api/business/base-api";
import {
  branch,
  division,
  employee,
  employee_status,
  level,
  position,
} from "@/types/schema";

const businessDashboardApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessDashboardCountActiveEmployees: builder.query<
      { count: number },
      void
    >({
      query: () => ({
        url: `dashboard/count/employee`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<{ count: number }>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessDashboardCountBranches: builder.query<{ count: number }, void>({
      query: () => ({
        url: `dashboard/count/branch`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<{ count: number }>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessDashboardCountDivisions: builder.query<{ count: number }, void>({
      query: () => ({
        url: `dashboard/count/division`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<{ count: number }>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessDashboardEmployeeContractWillEnd: builder.query<
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
        url: `dashboard/employee-contract-will-end`,
        method: "GET",
      }),
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
  }),
  overrideExisting: false,
});

export const {
  useBusinessDashboardCountBranchesQuery,
  useBusinessDashboardCountDivisionsQuery,
  useLazyBusinessDashboardCountBranchesQuery,
  useLazyBusinessDashboardCountDivisionsQuery,
  useBusinessDashboardCountActiveEmployeesQuery,
  useLazyBusinessDashboardCountActiveEmployeesQuery,
  useBusinessDashboardEmployeeContractWillEndQuery,
  useLazyBusinessDashboardEmployeeContractWillEndQuery,
} = businessDashboardApi;
