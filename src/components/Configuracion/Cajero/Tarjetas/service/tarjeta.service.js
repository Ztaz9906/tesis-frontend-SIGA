import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";

export const tarjetaApi = createApi({
    reducerPath: "tarjetaApi",
    baseQuery: customFetchBase,
    tagTypes: ["Tarjeta"],
    endpoints: (builder) => ({
        getTarjetas: builder.query({
            query: (filters) => {
                let baseURL = "/Cajero_TbDtarjetaAlimentacion/";
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
                        ...result.map(({id}) => ({
                            type: "Tarjeta",
                            id,
                        })),
                        {type: "Tarjeta", id: "LIST"},
                    ]
                    : [{type: "Tarjeta", id: "LIST"}],
        }),

        getTarjetaById: builder.query({
            query: (id) => ({
                url: `/Cajero_TbDtarjetaAlimentacion/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{type: "Tarjeta", id}],
        }),

        createTarjeta: builder.mutation({
            query: (Tarjeta) => ({
                url: "/Cajero_TbDtarjetaAlimentacion/",
                method: "POST",
                body: Tarjeta,
            }),
            invalidatesTags: [{type: "Tarjeta", id: "LIST"}],
        }),

        deleteTarjeta: builder.mutation({
            query: (id) => ({
                url: `/Cajero_TbDtarjetaAlimentacion/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Tarjeta", id: "LIST"}],
        }),

        editTarjeta: builder.mutation({
            query: (body) => ({
                url: `/Cajero_TbDtarjetaAlimentacion/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, {id}) =>
                result
                    ? [
                        {type: "Tarjeta", id},
                        {type: "Tarjeta", id: "LIST"},
                    ]
                    : [{type: "Tarjeta", id: "LIST"}],
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
} = tarjetaApi;