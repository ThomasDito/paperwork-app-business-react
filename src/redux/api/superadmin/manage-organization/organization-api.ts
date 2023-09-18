import { ApprovalSchema } from "@/pages/organization/submission/components/modals/approval-modal";
import { mainApi } from "@/redux/api/main-api";

const organizationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<
      ApiResponse<
        Array<
          organization & {
            _count: {
              user_organizations: number;
            };
          }
        >
      >,
      PaginationParams<organization> & { type?: "submission" | "accepted" }
    >({
      query: (params) => ({
        url: `superadmin/manage-organization/organization`,
        method: "GET",
        params,
      }),
    }),
    showOrganization: builder.query<showOrganizationResult, string | undefined>(
      {
        query: (id) => ({
          url: `superadmin/manage-organization/organization/${id}`,
          method: "GET",
        }),
        transformResponse: (response: ApiResponse<showOrganizationResult>) =>
          response.data,
      }
    ),
    changeStatusOrganization: builder.mutation<
      ApiResponse<unknown>,
      { organization_id: string; status: "active" | "inactive" }
    >({
      query: ({ organization_id, status }) => ({
        url: `superadmin/manage-organization/organization/change-status/${organization_id}/${status}`,
        method: "PUT",
      }),
    }),
    approvalOrganization: builder.mutation<
      ApiResponse<unknown>,
      ApprovalSchema
    >({
      query: (payload) => ({
        url: `superadmin/manage-organization/organization/approval`,
        method: "POST",
        body: payload,
      }),
    }),
    deleteSubmissionOrganization: builder.mutation<
      ApiResponse<unknown>,
      string
    >({
      query: (id) => ({
        url: `superadmin/manage-organization/organization/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyGetOrganizationsQuery,
  useShowOrganizationQuery,
  useLazyShowOrganizationQuery,
  useChangeStatusOrganizationMutation,
  useApprovalOrganizationMutation,
  useDeleteSubmissionOrganizationMutation,
} = organizationApi;
