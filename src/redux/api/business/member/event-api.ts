import { businessBaseApi } from "@/redux/api/business/base-api";
import { event } from "@/types/schema";

const businessEmployeeEventApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEmployeeEventGet: builder.query<Array<event>, void>({
      query: () => ({
        url: `employee/event`,
        method: "GET",
      }),
      providesTags: ["Employee/Event"],
      transformResponse: (response: ApiResponse<Array<event>>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessEmployeeEventShow: builder.query<event, string>({
      query: (id) => ({
        url: `employee/event/${id}`,
        method: "GET",
      }),
      providesTags: ["Employee/Event"],
      transformResponse: (response: ApiResponse<event>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEmployeeEventGetQuery,
  useBusinessEmployeeEventShowQuery,
  useLazyBusinessEmployeeEventShowQuery,
  useLazyBusinessEmployeeEventGetQuery,
} = businessEmployeeEventApi;
