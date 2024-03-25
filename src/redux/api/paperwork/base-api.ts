import config from "@/lib/config";
import { logout } from "@/redux/slices/auth-slice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: config.API_URL,
  prepareHeaders(headers) {
    if (config.DEBUG.AUTH_TOKEN) {
      headers.set("Authorization", `Bearer ${config.DEBUG.AUTH_TOKEN}`);
    }

    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // Perform logout if response status is 401 Unauthorized
  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const paperworkBaseApi = createApi({
  reducerPath: "paperwork-api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
