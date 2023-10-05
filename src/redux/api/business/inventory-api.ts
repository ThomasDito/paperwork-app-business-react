import { businessBaseApi } from "@/redux/api/business/base-api";
import { inventory } from "@/types/schema";

const businessInventoryApi = businessBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    businessInventoryGet: builder.query<Array<inventory>, void>({
      query: () => ({
        url: `inventory`,
        method: "GET",
      }),
      providesTags: ["Inventory"],
      transformResponse: (response: ApiResponse<Array<inventory>>) =>
        response.data,
      transformErrorResponse: (response) => response.data,
    }),
    businessInventoryShow: builder.query<inventory, string>({
      query: (id) => ({
        url: `inventory/${id}`,
        method: "GET",
      }),
      providesTags: ["Inventory"],
      transformResponse: (response: ApiResponse<inventory>) => response.data,
    }),
    businessInventoryStore: builder.mutation<
      ApiResponse<inventory>,
      Partial<inventory>
    >({
      query: (payload) => ({
        url: `inventory`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (_, error) => (!error ? ["Inventory"] : []),
    }),
    businessInventoryUpdate: builder.mutation<
      ApiResponse<inventory>,
      { id: string; payload: Partial<inventory> }
    >({
      query: ({ id, payload }) => ({
        url: `inventory/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (_, error) => (!error ? ["Inventory"] : []),
    }),
    businessInventoryDelete: builder.mutation<ApiResponse<inventory>, string>({
      query: (id) => ({
        url: `inventory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, error) => (!error ? ["Inventory"] : []),
    }),
  }),
  overrideExisting: false,
});

export const {
  useBusinessInventoryGetQuery,
  useBusinessInventoryShowQuery,
  useLazyBusinessInventoryShowQuery,
  useLazyBusinessInventoryGetQuery,
  useBusinessInventoryStoreMutation,
  useBusinessInventoryDeleteMutation,
  useBusinessInventoryUpdateMutation,
} = businessInventoryApi;
