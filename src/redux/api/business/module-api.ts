import { businessBaseApi } from "@/redux/api/business/base-api";
import { module } from "@/types/schema";

const businessModuleApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessModuleGet: builder.query<Array<module>, void>({
      query: () => ({
        url: `module`,
        method: "GET",
      }),
      providesTags: ["Module"],
      transformResponse: (response: ApiResponse<Array<module>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessModuleShow: builder.query<module, string>({
      query: (id) => ({
        url: `module/${id}`,
        method: "GET",
      }),
      providesTags: ["Module"],
      transformResponse: (response: ApiResponse<module>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessModuleGetQuery,
  useBusinessModuleShowQuery,
  useLazyBusinessModuleShowQuery,
  useLazyBusinessModuleGetQuery,
} = businessModuleApi;
