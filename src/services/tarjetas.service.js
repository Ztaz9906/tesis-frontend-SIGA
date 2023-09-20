import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./config/customFetchBase";


export const tarjetasApi = createApi({
  reducerPath: "tarjetasApi",
  baseQuery: customFetchBase,
  tagTypes: ["Tarjeta"],
  endpoints: (builder) => ({
    getTarjetas: builder.query({
      query: () => ({
        url: "/Cajero_TbDtarjetaAlimentacion/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Tarjeta",
                id,
              })),
              { type: "Tarjeta", id: "LIST" },
            ]
          : [{ type: "Tarjeta", id: "LIST" }],
    }),

    getTarjetaById: builder.query({
      query: (id) => ({
        url: `/Cajero_TbDtarjetaAlimentacion/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Tarjeta", id }],
    }),

    createTarjeta: builder.mutation({
      query: (tarjeta) => ({
        url: "/Cajero_TbDtarjetaAlimentacion/",
        method: "POST",
        body: tarjeta,
      }),
      invalidatesTags: [{ type: "Tarjeta", id: "LIST" }],
    }),

    deleteTarjeta: builder.mutation({
      query: (id) => ({
        url: `/Cajero_TbDtarjetaAlimentacion/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Tarjeta", id: "LIST" }],
    }),

    editTarjeta: builder.mutation({
      query: (body) => ({
        url: `/Cajero_TbDtarjetaAlimentacion/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Tarjeta", id },
              { type: "Tarjeta", id: "LIST" },
            ]
          : [{ type: "Tarjeta", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateTarjetaMutation,
  useDeleteTarjetaMutation,
  useEditTarjetaMutation,
  useGetTarjetaByIdQuery,
  useGetTarjetasQuery,
  useLazyGetTarjetaByIdQuery,
} = tarjetasApi;
