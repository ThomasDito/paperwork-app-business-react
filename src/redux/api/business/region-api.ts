import { businessBaseApi } from "@/redux/api/business/base-api";

const regionApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessRegionShow: builder.query<region, string>({
      query: (id) => ({
        url: `region/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<region>) => response.data,
    }),
    businessRegionGetProvinces: builder.query<region[], void>({
      query: () => ({
        url: `region/provinces`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<region[]>) => response.data,
    }),
    businessRegionGetCitiesByProvinceId: builder.query<region[], string>({
      query: (provinceId) => ({
        url: `region/provinces/${provinceId}/cities`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<region[]>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyBusinessRegionShowQuery,
  useLazyBusinessRegionGetProvincesQuery,
  useLazyBusinessRegionGetCitiesByProvinceIdQuery,
} = regionApi;
