import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const accesosApi = createApi({
    reducerPath: "accesosApi",
    baseQuery: customFetchBase,
    tagTypes: ["Acceso"],
    endpoints: (builder) => ({
        getAcceso: builder.query({
            query: (filters) => {
                let baseURL = "/Cajero_TbDaccesoEventoSecundario/";
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
                            type: "Acceso",
                            id,
                        })),
                        {type: "Acceso", id: "LIST"},
                    ]
                    : [{type: "Acceso", id: "LIST"}],
        }),

        getAccesoById: builder.query({
            query: (id) => ({
                url: `/Cajero_TbDaccesoEventoSecundario/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{type: "Acceso", id}],
        }),

        createAcceso: builder.mutation({
            query: (Acceso) => ({
                url: "/Cajero_TbDaccesoEventoSecundario/",
                method: "POST",
                body: Acceso,
            }),
            invalidatesTags: [{type: "Acceso", id: "LIST"}],
        }),

        deleteAcceso: builder.mutation({
            query: (id) => ({
                url: `/Cajero_TbDaccesoEventoSecundario/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Acceso", id: "LIST"}],
        }),

        editAcceso: builder.mutation({
            query: (body) => ({
                url: `/Cajero_TbDaccesoEventoSecundario/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, {id}) =>
                result
                    ? [
                        {type: "Acceso", id},
                        {type: "Acceso", id: "LIST"},
                    ]
                    : [{type: "Acceso", id: "LIST"}],
        }),
    }),
});

export const {
    useCreateAccesoMutation,
    useDeleteAccesoMutation,
    useEditAccesoMutation,
    useGetAccesoByIdQuery,
    useGetAccesoQuery,
    useLazyGetAccesoByIdQuery,
} = accesosApi;
