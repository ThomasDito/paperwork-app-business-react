import { businessBaseApi } from "@/redux/api/business/base-api";
import { information } from "@/types/schema";

const businessMemberInformationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessMemberInformationGet: builder.query<
      Array<information>,
      { date: Date | string; type: "active" | "history" }
    >({
      query: ({ date, type }) => ({
        url: `member/information/${date}/${type}`,
        method: "GET",
      }),
      providesTags: ["Member/Information"],
      transformResponse: (response: ApiResponse<Array<information>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessMemberInformationGetQuery,
  useLazyBusinessMemberInformationGetQuery,
} = businessMemberInformationApi;
