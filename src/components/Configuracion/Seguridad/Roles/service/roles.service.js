import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const gruposApi = createApi({
  reducerPath: "gruposApi",
  baseQuery: customFetchBase,
  tagTypes: ["Grupo"],
  endpoints: (builder) => ({
    getGrupos: builder.query({
      query: () => ({
        url: "/api/management/grupos/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Grupo",
                id,
              })),
              { type: "Grupo", id: "LIST" },
            ]
          : [{ type: "Grupo", id: "LIST" }],
    }),

    getGrupoById: builder.query({
      query: (id) => ({
        url: `/api/management/grupos/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Grupo", id }],
    }),

    createGrupo: builder.mutation({
      query: (Grupo) => ({
        url: "/api/management/grupos/",
        method: "POST",
        body: Grupo,
      }),
      invalidatesTags: [{ type: "Grupo", id: "LIST" }],
    }),

    deleteGrupo: builder.mutation({
      query: (id) => ({
        url: `/api/management/grupos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Grupo", id: "LIST" }],
    }),

    editGrupo: builder.mutation({
      query: (body) => ({
        url: `/api/management/grupos/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Grupo", id },
              { type: "Grupo", id: "LIST" },
            ]
          : [{ type: "Grupo", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateGrupoMutation,
  useDeleteGrupoMutation,
  useEditGrupoMutation,
  useGetGrupoByIdQuery,
  useGetGruposQuery,
  useLazyGetGrupoByIdQuery,
} = gruposApi;
