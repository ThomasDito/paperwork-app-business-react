import { RoleFormSchema } from "@/pages/business/organization/role/form";
import { businessBaseApi } from "@/redux/api/business/base-api";
import { role, role_item, user } from "@/types/schema";

const businessRoleApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessRoleGet: builder.query<
      ApiResponse<
        Array<
          role & {
            user: user;
            role_items: Array<role_item>;
          }
        >
      >,
      PaginationParams<role> | void
    >({
      query: (params) => ({
        url: `business/role`,
        method: "GET",
        params: typeof params === "object" ? params : undefined,
      }),
      providesTags: ["Role"],
    }),
    businessRoleShow: builder.query<
      role & {
        user: user;
        role_items: Array<role_item>;
      },
      string
    >({
      query: (id) => ({
        url: `business/role/${id}`,
        method: "GET",
      }),
      providesTags: ["Role"],
      transformResponse: (
        response: ApiResponse<
          role & {
            user: user;
            role_items: Array<role_item>;
          }
        >
      ) => response.data,
    }),
    businessRoleStore: builder.mutation<ApiResponse<role>, RoleFormSchema>({
      query: (payload) => ({
        url: `business/role`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_, error) => (!error ? ["Role", "Member/Account"] : []),
    }),
    businessRoleUpdate: builder.mutation<
      ApiResponse<role>,
      { id: string; payload: RoleFormSchema }
    >({
      query: ({ id, payload }) => ({
        url: `business/role/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_, error) => (!error ? ["Role", "Member/Account"] : []),
    }),
    businessRoleChangeStatus: builder.mutation<
      ApiResponse<role>,
      { id: string; payload: Pick<role, "role_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `business/role/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_, error) => (!error ? ["Role", "Member/Account"] : []),
    }),
    businessRoleDelete: builder.mutation<ApiResponse<role>, string>({
      query: (id) => ({
        url: `business/role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (!error ? ["Role", "Member/Account"] : []),
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessRoleGetQuery,
  useBusinessRoleShowQuery,
  useLazyBusinessRoleShowQuery,
  useLazyBusinessRoleGetQuery,
  useBusinessRoleStoreMutation,
  useBusinessRoleDeleteMutation,
  useBusinessRoleUpdateMutation,
  useBusinessRoleChangeStatusMutation,
} = businessRoleApi;
