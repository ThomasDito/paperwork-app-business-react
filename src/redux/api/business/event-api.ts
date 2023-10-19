import { businessBaseApi } from "@/redux/api/business/base-api";
import { event } from "@/types/schema";

const businessEventApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessEventGet: builder.query<Array<event>, void>({
      query: () => ({
        url: `event`,
        method: "GET",
      }),
      providesTags: ["Event"],
      transformResponse: (response: ApiResponse<Array<event>>) => response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessEventShow: builder.query<event, string>({
      query: (id) => ({
        url: `event/${id}`,
        method: "GET",
      }),
      providesTags: ["Event"],
      transformResponse: (response: ApiResponse<event>) => response.data,
    }),
    businessEventStore: builder.mutation<ApiResponse<event>, Partial<event>>({
      query: (payload) => ({
        url: `event`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Event"],
    }),
    businessEventUpdate: builder.mutation<
      ApiResponse<event>,
      { id: string; payload: Partial<event> }
    >({
      query: ({ id, payload }) => ({
        url: `event/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Event"],
    }),
    businessEventDelete: builder.mutation<ApiResponse<event>, string>({
      query: (id) => ({
        url: `event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessEventGetQuery,
  useBusinessEventShowQuery,
  useLazyBusinessEventShowQuery,
  useLazyBusinessEventGetQuery,
  useBusinessEventStoreMutation,
  useBusinessEventDeleteMutation,
  useBusinessEventUpdateMutation,
} = businessEventApi;
