import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const permisosApi = createApi({
  reducerPath: "permisosApi",
  baseQuery: customFetchBase,
  tagTypes: ["Permiso"],
  endpoints: (builder) => ({
    getPermisos: builder.query({
      query: () => ({
        url: "/api/management/permisos/",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Permiso",
                id,
              })),
              { type: "Permiso", id: "LIST" },
            ]
          : [{ type: "Permiso", id: "LIST" }],
    }),

    getPermisoById: builder.query({
      query: (id) => ({
        url: `/api/management/permisos/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Permiso", id }],
    }),
  }),
});

export const {
  useGetPermisosQuery,
  useLazyGetPermisoByIdQuery,
} = permisosApi;
