import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";



export const productoApi = createApi({
  reducerPath: "productoApi",
  baseQuery: customFetchBase,
  tagTypes: ["Producto"],
  endpoints: (builder) => ({
    getProducto: builder.query({
      query: (filters) => {
        let baseURL = "/Asset_TbDproducto/";
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
                type: "Producto",
                id,
              })),
              { type: "Producto", id: "LIST" },
            ]
          : [{ type: "Producto", id: "LIST" }],
    }),

    getProductoById: builder.query({
      query: (id) => ({
        url: `/Asset_TbDproducto/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Producto", id }],
    }),

    createProducto: builder.mutation({
      query: (Producto) => ({
        url: "/Asset_TbDproducto/",
        method: "POST",
        body: Producto,
      }),
      invalidatesTags: [{ type: "Producto", id: "LIST" }],
    }),

    deleteProducto: builder.mutation({
      query: (id) => ({
        url: `/Asset_TbDproducto/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Producto", id: "LIST" }],
    }),

    editProducto: builder.mutation({
      query: (body) => ({
        url: `/Asset_TbDproducto/${body.id}/`,
        method: "PATCH",
                 body,
      }),
      invalidatesTags: (result, error, { id }) =>
        result
          ? [
              { type: "Producto", id },
              { type: "Producto", id: "LIST" },
            ]
          : [{ type: "Producto", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateProductoMutation,
  useDeleteProductoMutation,
  useEditProductoMutation,
  useGetProductoByIdQuery,
  useGetProductoQuery,
  useLazyGetProductoByIdQuery,
} = productoApi;
