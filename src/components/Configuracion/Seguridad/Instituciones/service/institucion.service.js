import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const institucionApi = createApi({
  reducerPath: "institucionApi",
  baseQuery: customFetchBase,
  tagTypes: ["Institucion"],
  endpoints: (builder) => ({
    getInstituciones: builder.query({
      query: () => ({
        url: "/Instituciones/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Institucion",
                id,
              })),
              { type: "Institucion", id: "LIST" },
            ]
          : [{ type: "Institucion", id: "LIST" }],
    }),

    getInstitucionById: builder.query({
      query: (id) => ({
        url: `/Instituciones/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Institucion", id }],
    }),

    createInstitucion: builder.mutation({
      query: (Institucion) => ({
        url: "/Instituciones/",
        method: "POST",
        body: Institucion,
      }),
      invalidatesTags: [{ type: "Institucion", id: "LIST" }],
    }),

    deleteInstitucion: builder.mutation({
      query: (id) => ({
        url: `/Instituciones/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Institucion", id: "LIST" }],
    }),

    editInstitucion: builder.mutation({
      query: (body) => ({
        url: `/Instituciones/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Institucion", id },
              { type: "Institucion", id: "LIST" },
            ]
          : [{ type: "Institucion", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateInstitucionMutation,
  useDeleteInstitucionMutation,
  useEditInstitucionMutation,
  useGetInstitucionByIdQuery,
  useGetInstitucionesQuery,
  useLazyGetInstitucionByIdQuery,
} = institucionApi;
