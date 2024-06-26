import { businessBaseApi } from "@/redux/api/business/base-api";
import { role_item_type, user } from "@/types/schema";

const businessMemberAccountApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessMemberAccountMe: builder.query<user, void>({
      query: () => ({
        url: `member/account/me`,
        method: "GET",
      }),
      providesTags: ["Member/Account"],
      transformResponse: (response: ApiResponse<user>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessMemberAccountModules: builder.query<
      Array<{ module_key: string; permission: role_item_type }>,
      void
    >({
      query: () => ({
        url: `member/account/modules`,
        method: "GET",
      }),
      providesTags: ["Member/Account"],
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
  useBusinessMemberAccountMeQuery,
  useBusinessMemberAccountModulesQuery,
  useLazyBusinessMemberAccountMeQuery,
  useLazyBusinessMemberAccountModulesQuery,
} = businessMemberAccountApi;
