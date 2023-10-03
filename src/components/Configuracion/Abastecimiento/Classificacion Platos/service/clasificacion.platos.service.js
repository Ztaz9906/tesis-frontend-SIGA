import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const classPlatosApi = createApi({
  reducerPath: "classPlatosApi",
  baseQuery: customFetchBase,
  tagTypes: ["ClassPlatos"],
  endpoints: (builder) => ({
    getClassPlatos: builder.query({
      query: (filters) => {
        let baseURL = "/Abastecimiento_TbNclasificacionPlato/";
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
                type: "ClassPlatos",
                id,
              })),
              { type: "ClassPlatos", id: "LIST" },
            ]
          : [{ type: "ClassPlatos", id: "LIST" }],
    }),

    getClassPlatosById: builder.query({
      query: (id) => ({
        url: `/Abastecimiento_TbNclasificacionPlato/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "ClassPlatos", id }],
    }),

    createClassPlatos: builder.mutation({
      query: (ClassPlatos) => ({
        url: "/Abastecimiento_TbNclasificacionPlato/",
        method: "POST",
        body: ClassPlatos,
      }),
      invalidatesTags: [{ type: "ClassPlatos", id: "LIST" }],
    }),

    deleteClassPlatos: builder.mutation({
      query: (id) => ({
        url: `/Abastecimiento_TbNclasificacionPlato/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ClassPlatos", id: "LIST" }],
    }),

    editClassPlatos: builder.mutation({
      query: (body) => ({
        url: `/Abastecimiento_TbNclasificacionPlato/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "ClassPlatos", id },
              { type: "ClassPlatos", id: "LIST" },
            ]
          : [{ type: "ClassPlatos", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateClassPlatosMutation,
  useDeleteClassPlatosMutation,
  useEditClassPlatosMutation,
  useGetClassPlatosByIdQuery,
  useGetClassPlatosQuery,
  useLazyGetClassPlatosByIdQuery,
} = classPlatosApi;
