import { businessBaseApi } from "@/redux/api/business/base-api";
import { user, user_organization } from "@/types/schema";

const businessMemberApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessMemberGet: builder.query<
      ApiResponse<
        Array<user & { user_organizations: Array<user_organization> }>
      >,
      PaginationParams<user> | void
    >({
      query: (params) => ({
        url: `member`,
        method: "GET",
        params: typeof params === "object" ? params : undefined,
      }),
      providesTags: ["Member"],
    }),
    businessMemberShow: builder.query<user, string>({
      query: (id) => ({
        url: `member/${id}`,
        method: "GET",
      }),
      providesTags: ["Member"],
      transformResponse: (response: ApiResponse<user>) => response.data,
    }),
    businessMemberCheckByEmail: builder.query<user, string>({
      query: (email) => ({
        url: `member/check-by-email/${email}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<user>) => response.data,
    }),
    businessMemberStore: builder.mutation<
      ApiResponse<user>,
      { user_email: string }
    >({
      query: (payload) => ({
        url: `member`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Member"],
    }),
    businessMemberUpdate: builder.mutation<
      ApiResponse<user>,
      { id: string; payload: Partial<user> }
    >({
      query: ({ id, payload }) => ({
        url: `member/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Member"],
    }),
    businessMemberDelete: builder.mutation<ApiResponse<user>, string>({
      query: (id) => ({
        url: `member/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Member"],
    }),
    businessMemberChangeStatus: builder.mutation<
      ApiResponse<user>,
      { id: string; payload: Pick<user, "user_status"> }
    >({
      query: ({ id, payload }) => ({
        url: `member/${id}/change-status`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Member"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessMemberGetQuery,
  useBusinessMemberShowQuery,
  useLazyBusinessMemberShowQuery,
  useLazyBusinessMemberGetQuery,
  useLazyBusinessMemberCheckByEmailQuery,
  useBusinessMemberCheckByEmailQuery,
  useBusinessMemberStoreMutation,
  useBusinessMemberDeleteMutation,
  useBusinessMemberUpdateMutation,
  useBusinessMemberChangeStatusMutation,
} = businessMemberApi;
