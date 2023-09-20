import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./config/customFetchBase";


export const AsignarIpApi = createApi({
  reducerPath: "asignaripApi",
  baseQuery: customFetchBase,
  tagTypes: ["AsignarIp"],
  endpoints: (builder) => ({
    getAsignarIp: builder.query({
      query: () => ({
        url: "/Distribucion_TbStructure/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "AsignarIp",
                id,
              })),
              { type: "AsignarIp", id: "LIST" },
            ]
          : [{ type: "AsignarIp", id: "LIST" }],
    }),

    getAsignarIpById: builder.query({
      query: (id) => ({
        url: `/Cajero_TbDAsignarIpAlimentacion/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "AsignarIp", id }],
    }),

    createAsignarIp: builder.mutation({
      query: (AsignarIp) => ({
        url: "/Cajero_TbDAsignarIpAlimentacion/",
        method: "POST",
        body: AsignarIp,
      }),
      invalidatesTags: [{ type: "AsignarIp", id: "LIST" }],
    }),

    deleteAsignarIp: builder.mutation({
      query: (id) => ({
        url: `/Cajero_TbDAsignarIpAlimentacion/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "AsignarIp", id: "LIST" }],
    }),

    editAsignarIp: builder.mutation({
      query: (body) => ({
        url: `/Cajero_TbDAsignarIpAlimentacion/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "AsignarIp", id },
              { type: "AsignarIp", id: "LIST" },
            ]
          : [{ type: "AsignarIp", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateAsignarIpMutation,
  useDeleteAsignarIpMutation,
  useEditAsignarIpMutation,
  useGetAsignarIpByIdQuery,
  useGetAsignarIpQuery,
  useLazyGetAsignarIpByIdQuery,
} = AsignarIpApi;
