import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const tipoProductoApi = createApi({
  reducerPath: "tipoProductoApi",
  baseQuery: customFetchBase,
  tagTypes: ["TipoProducto"],
  endpoints: (builder) => ({
    getTipoProducto: builder.query({
      query: (filters) => {
        let baseURL = "/Abastecimiento_TbNtipoProducto/";
        let queryStrings = [];
        for (let key in filters) {
          if (filters[key] && filters[key] !== "") {
            queryStrings.push(`${key}=${filters[key]}`);
          }
        }
        return {
          url: baseURL + (queryStrings.length ? `?${queryStrings.join('&')}` : ''),
          method: "GET"
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "TipoProducto",
                id,
              })),
              { type: "TipoProducto", id: "LIST" },
            ]
          : [{ type: "TipoProducto", id: "LIST" }],
    }),

    getTipoProductoById: builder.query({
      query: (id) => ({
        url: `/Abastecimiento_TbNtipoProducto/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "TipoProducto", id }],
    }),

    createTipoProducto: builder.mutation({
      query: (TipoProducto) => ({
        url: "/Abastecimiento_TbNtipoProducto/",
        method: "POST",
        body: TipoProducto,
      }),
      invalidatesTags: [{ type: "TipoProducto", id: "LIST" }],
    }),

    deleteTipoProducto: builder.mutation({
      query: (id) => ({
        url: `/Abastecimiento_TbNtipoProducto/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "TipoProducto", id: "LIST" }],
    }),

    editTipoProducto: builder.mutation({
      query: (body) => ({
        url: `/Abastecimiento_TbNtipoProducto/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "TipoProducto", id },
              { type: "TipoProducto", id: "LIST" },
            ]
          : [{ type: "TipoProducto", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateTipoProductoMutation,
  useDeleteTipoProductoMutation,
  useEditTipoProductoMutation,
  useGetTipoProductoByIdQuery,
  useGetTipoProductoQuery,
  useLazyGetTipoProductoByIdQuery,
} = tipoProductoApi;
