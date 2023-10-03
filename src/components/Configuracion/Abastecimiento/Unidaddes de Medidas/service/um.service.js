import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const umedidaApi = createApi({
  reducerPath: "umedidaApi",
  baseQuery: customFetchBase,
  tagTypes: ["UM"],
  endpoints: (builder) => ({
    getUM: builder.query({
      query: (filters) => {
        let baseURL = "/Abastecimiento_TbNunidadMedida/";
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
                type: "UM",
                id,
              })),
              { type: "UM", id: "LIST" },
            ]
          : [{ type: "UM", id: "LIST" }],
    }),

    getUMById: builder.query({
      query: (id) => ({
        url: `/Abastecimiento_TbNunidadMedida/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "UM", id }],
    }),

    createUM: builder.mutation({
      query: (UM) => ({
        url: "/Abastecimiento_TbNunidadMedida/",
        method: "POST",
        body: UM,
      }),
      invalidatesTags: [{ type: "UM", id: "LIST" }],
    }),

    deleteUM: builder.mutation({
      query: (id) => ({
        url: `/Abastecimiento_TbNunidadMedida/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "UM", id: "LIST" }],
    }),

    editUM: builder.mutation({
      query: (body) => ({
        url: `/Abastecimiento_TbNunidadMedida/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "UM", id },
              { type: "UM", id: "LIST" },
            ]
          : [{ type: "UM", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateUMMutation,
  useDeleteUMMutation,
  useEditUMMutation,
  useGetUMByIdQuery,
  useGetUMQuery,
  useLazyGetUMByIdQuery,
} = umedidaApi;
