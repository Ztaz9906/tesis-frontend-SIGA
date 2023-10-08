import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const estadotarjetaApi = createApi({
  reducerPath: "estadotarjetaApi",
  baseQuery: customFetchBase,
  tagTypes: ["EstadoTarjeta"],
  endpoints: (builder) => ({
    getEstadoTarjetas: builder.query({
      query: (filters) => {
        let baseURL = "/Cajero_TbNestadoTarjeta/";
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
                type: "EstadoTarjeta",
                id,
              })),
              { type: "EstadoTarjeta", id: "LIST" },
            ]
          : [{ type: "EstadoTarjeta", id: "LIST" }],
    }),

    getEstadoTarjetaById: builder.query({
      query: (id) => ({
        url: `/Cajero_TbNestadoTarjeta/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "EstadoTarjeta", id }],
    }),

    createEstadoTarjeta: builder.mutation({
      query: (EstadoTarjeta) => ({
        url: "/Cajero_TbNestadoTarjeta/",
        method: "POST",
        body: EstadoTarjeta,
      }),
      invalidatesTags: [{ type: "EstadoTarjeta", id: "LIST" }],
    }),

    deleteEstadoTarjeta: builder.mutation({
      query: (id) => ({
        url: `/Cajero_TbNestadoTarjeta/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EstadoTarjeta", id: "LIST" }],
    }),

    editEstadoTarjeta: builder.mutation({
      query: (body) => ({
        url: `/Cajero_TbNestadoTarjeta/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "EstadoTarjeta", id },
              { type: "EstadoTarjeta", id: "LIST" },
            ]
          : [{ type: "EstadoTarjeta", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateEstadoTarjetaMutation,
  useDeleteEstadoTarjetaMutation,
  useEditEstadoTarjetaMutation,
  useGetEstadoTarjetaByIdQuery,
  useGetEstadoTarjetasQuery,
  useLazyGetEstadoTarjetaByIdQuery,
} = estadotarjetaApi;
