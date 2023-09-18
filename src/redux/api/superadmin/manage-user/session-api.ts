import { mainApi } from "@/redux/api/main-api";

const userSessionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSessions: builder.query<
      ApiResponse<Array<user_session>>,
      {
        user_id: string;
        params: PaginationParams<user_session>;
      }
    >({
      query: ({ user_id, params }) => ({
        url: `superadmin/manage-user/session/${user_id}`,
        method: "GET",
        params,
      }),
    }),
    deleteSession: builder.mutation<
      ApiResponse<unknown>,
      { user_id: string; session_id: string }
    >({
      query: ({ user_id, session_id }) => ({
        url: `superadmin/manage-user/session/${user_id}/${session_id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetUserSessionsQuery, useDeleteSessionMutation } =
  userSessionApi;
