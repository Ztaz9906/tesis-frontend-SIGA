import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./config/customFetchBase";


export const personaApi = createApi({
  reducerPath: "PersonaApi",
  baseQuery: customFetchBase,
  tagTypes: ["Persona"],
  endpoints: (builder) => ({
    getPersona: builder.query({
      query: () => ({
        url: "/Persona/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Persona",
                id,
              })),
              { type: "Persona", id: "LIST" },
            ]
          : [{ type: "Persona", id: "LIST" }],
    }),

    getPersonaById: builder.query({
      query: (id) => ({
        url: `/Persona/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Persona", id }],
    }),

    createPersona: builder.mutation({
      query: (Persona) => ({
        url: "/Persona/",
        method: "POST",
        body: Persona,
      }),
      invalidatesTags: [{ type: "Persona", id: "LIST" }],
    }),

    deletePersona: builder.mutation({
      query: (id) => ({
        url: `/Persona/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Persona", id: "LIST" }],
    }),

    editPersona: builder.mutation({
      query: (body) => ({
        url: `/Persona/${body.id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Persona", id },
              { type: "Persona", id: "LIST" },
            ]
          : [{ type: "Persona", id: "LIST" }],
    }),
  }),
});

export const {
  useCreatePersonaMutation,
  useDeletePersonaMutation,
  useEditPersonaMutation,
  useGetPersonaByIdQuery,
  useGetPersonaQuery,
  useLazyGetPersonaByIdQuery,
} = personaApi;
