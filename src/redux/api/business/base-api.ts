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
    if (config.DEBUG.ORGANIZATION_ID) {
      headers.set("organization-id", config.DEBUG.ORGANIZATION_ID);
    } else {
      headers.set("organization-id", window.location.hostname);
    }

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

export const businessBaseApi = createApi({
  reducerPath: "business-api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: [
    "Organization",
    "Role",
    "Module",
    "Information",
    "Inventory",
    "Event",
    "Application",
    "Member",

    // MEMBER
    "Member/Application",
    "Member/Account",
    "Member/Information",
    "Member/Event",
  ],
});
