import { businessBaseApi } from "@/redux/api/business/base-api";
import { event } from "@/types/schema";

const businessMemberEventApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessMemberEventGet: builder.query<Array<event>, void>({
      query: () => ({
        url: `member/event`,
        method: "GET",
      }),
      providesTags: ["Member/Event"],
      transformResponse: (response: ApiResponse<Array<event>>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessMemberEventShow: builder.query<event, string>({
      query: (id) => ({
        url: `member/event/${id}`,
        method: "GET",
      }),
      providesTags: ["Member/Event"],
      transformResponse: (response: ApiResponse<event>) => response.data,
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessMemberEventGetQuery,
  useBusinessMemberEventShowQuery,
  useLazyBusinessMemberEventShowQuery,
  useLazyBusinessMemberEventGetQuery,
} = businessMemberEventApi;
