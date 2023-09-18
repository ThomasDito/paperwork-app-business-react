import { mainApi } from "@/redux/api/main-api";

const regionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    regionShow: builder.query<region, string>({
      query: (id) => ({
        url: `region/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<region>) => response.data,
    }),
    regionGetProvinces: builder.query<region[], void>({
      query: () => ({
        url: `region/provinces`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<region[]>) => response.data,
    }),
    regionGetCitiesByProvinceId: builder.query<region[], string>({
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
  useLazyRegionShowQuery,
  useLazyRegionGetProvincesQuery,
  useLazyRegionGetCitiesByProvinceIdQuery,
} = regionApi;
