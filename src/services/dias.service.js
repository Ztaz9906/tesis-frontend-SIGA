import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./config/customFetchBase";


export const diasApi = createApi({
  reducerPath: "diasApi",
  baseQuery: customFetchBase,
  tagTypes: ["Dias"],
  endpoints: (builder) => ({
    getDias: builder.query({
      query: () => ({
        url: "/Distribucion_TbNdiaSemana/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Dias",
                id,
              })),
              { type: "Dias", id: "LIST" },
            ]
          : [{ type: "Dias", id: "LIST" }],
    }),

    getDiasById: builder.query({
      query: (id) => ({
        url: `/Distribucion_TbNdiaSemana/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Dias", id }],
    }),

    createDias: builder.mutation({
      query: (Dias) => ({
        url: "/Distribucion_TbNdiaSemana/",
        method: "POST",
        body: Dias,
      }),
      invalidatesTags: [{ type: "Dias", id: "LIST" }],
    }),

    deleteDias: builder.mutation({
      query: (id) => ({
        url: `/Distribucion_TbNdiaSemana/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Dias", id: "LIST" }],
    }),

    editDias: builder.mutation({
      query: (body) => ({
        url: `/Distribucion_TbNdiaSemana/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Dias", id },
              { type: "Dias", id: "LIST" },
            ]
          : [{ type: "Dias", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateDiasMutation,
  useDeleteDiasMutation,
  useEditDiasMutation,
  useGetDiasByIdQuery,
  useGetDiasQuery,
  useLazyGetDiasByIdQuery,
} = diasApi;
