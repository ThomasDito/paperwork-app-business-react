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
  baseUrl: config.BUSINESS_API_URL,
  prepareHeaders(headers) {
    headers.set("organization-id", window.location.hostname);
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Perform logout if response status is 401 Unauthorized
  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
    }
  }

  return result;
};

export const businessBaseApi = createApi({
  reducerPath: "business-api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Branch", "Division", "Position"],
});
