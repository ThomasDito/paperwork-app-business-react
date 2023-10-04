import { RoleFormSchema } from "@/pages/business/organization/role/form";
import { businessBaseApi } from "@/redux/api/business/base-api";
import { position, role, role_item } from "@/types/schema";

const businessRoleApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessRoleGet: builder.query<
      Array<
        role & {
          position: position;
          role_items: Array<role_item>;
        }
      >,
      void
    >({
      query: () => ({
        url: `role`,
        method: "GET",
      }),
      providesTags: ["Role"],
      transformResponse: (
        response: ApiResponse<
          Array<
            role & {
              position: position;
              role_items: Array<role_item>;
            }
          >
        >
      ) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessRoleShow: builder.query<
      role & {
        position: position;
        role_items: Array<role_item>;
      },
      string
    >({
      query: (id) => ({
        url: `role/${id}`,
        method: "GET",
      }),
      providesTags: ["Role"],
      transformResponse: (
        response: ApiResponse<
          role & {
            position: position;
            role_items: Array<role_item>;
          }
        >
      ) => response.data,
    }),
    businessRoleStore: builder.mutation<ApiResponse<role>, RoleFormSchema>({
      query: (payload) => ({
        url: `role`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    businessRoleUpdate: builder.mutation<
      ApiResponse<role>,
      { id: string; payload: RoleFormSchema }
    >({
      query: ({ id, payload }) => ({
        url: `role/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    businessRoleChangeStatus: builder.mutation<
      ApiResponse<role>,
      { id: string; payload: Pick<role, "role_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `role/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Role"],
    }),
    businessRoleDelete: builder.mutation<ApiResponse<role>, string>({
      query: (id) => ({
        url: `role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
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
