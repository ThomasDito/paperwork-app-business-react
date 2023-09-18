import { mainApi } from "@/redux/api/main-api";

const userOganizationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrganizations: builder.query<
      ApiResponse<
        Array<
          organization & {
            _count: {
              user_organizations: number;
            };
          }
        >
      >,
      {
        user_id: string;
        params: PaginationParams<organization>;
      }
    >({
      query: ({ user_id, params }) => ({
        url: `superadmin/manage-user/organization/${user_id}`,
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetUserOrganizationsQuery } = userOganizationApi;
