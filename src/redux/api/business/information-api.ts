import { businessBaseApi } from "@/redux/api/business/base-api";
import { information } from "@/types/schema";

const businessInformationApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessInformationGet: builder.query<
      ApiResponse<Array<information>>,
      PaginationParams<information> | void
    >({
      query: (params) => ({
        url: `information`,
        method: "GET",
        params: typeof params === "object" ? params : undefined,
      }),
      providesTags: ["Information"],
    }),
    businessInformationShow: builder.query<information, string>({
      query: (id) => ({
        url: `information/${id}`,
        method: "GET",
      }),
      providesTags: ["Information"],
      transformResponse: (response: ApiResponse<information>) => response.data,
    }),
    businessInformationStore: builder.mutation<
      ApiResponse<information>,
      Partial<information>
    >({
      query: (payload) => ({
        url: `information`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Information"],
    }),
    businessInformationUpdate: builder.mutation<
      ApiResponse<information>,
      { id: string; payload: Partial<information> }
    >({
      query: ({ id, payload }) => ({
        url: `information/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Information"],
    }),
    businessInformationDelete: builder.mutation<
      ApiResponse<information>,
      string
    >({
      query: (id) => ({
        url: `information/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Information"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessInformationGetQuery,
  useBusinessInformationShowQuery,
  useLazyBusinessInformationShowQuery,
  useLazyBusinessInformationGetQuery,
  useBusinessInformationStoreMutation,
  useBusinessInformationDeleteMutation,
  useBusinessInformationUpdateMutation,
} = businessInformationApi;
