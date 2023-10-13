import { businessBaseApi } from "@/redux/api/business/base-api";
import { information } from "@/types/schema";

const businessEmployeeInformationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEmployeeInformationGet: builder.query<
      Array<information>,
      { date: Date | string; type: "active" | "history" }
    >({
      query: ({ date, type }) => ({
        url: `employee/information/${date}/${type}`,
        method: "GET",
      }),
      providesTags: ["Employee/Information"],
      transformResponse: (response: ApiResponse<Array<information>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEmployeeInformationGetQuery,
  useLazyBusinessEmployeeInformationGetQuery,
} = businessEmployeeInformationApi;
