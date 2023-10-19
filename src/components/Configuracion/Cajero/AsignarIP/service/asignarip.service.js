import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const asignarIpApi = createApi({
    reducerPath: "asignarIpApi",
    baseQuery: customFetchBase,
    tagTypes: ["AsignarIp"],
    endpoints: (builder) => ({
        getAsignarIp: builder.query({
            query: (filters) => {
                let baseURL = "/Cajero_TbDIp_Puerta/";
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
                            type: "AsignarIp",
                            id,
                        })),
                        {type: "AsignarIp", id: "LIST"},
                    ]
                    : [{type: "AsignarIp", id: "LIST"}],
        }),

        getAsignarIpById: builder.query({
            query: (id) => ({
                url: `/Cajero_TbDIp_Puerta/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{type: "AsignarIp", id}],
        }),

        createAsignarIp: builder.mutation({
            query: (AsignarIp) => ({
                url: "/Cajero_TbDIp_Puerta/",
                method: "POST",
                body: AsignarIp,
            }),
            invalidatesTags: [{type: "AsignarIp", id: "LIST"}],
        }),

        deleteAsignarIp: builder.mutation({
            query: (id) => ({
                url: `/Cajero_TbDIp_Puerta/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "AsignarIp", id: "LIST"}],
        }),

        editAsignarIp: builder.mutation({
            query: (body) => ({
                url: `/Cajero_TbDIp_Puerta/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, {id}) =>
                result
                    ? [
                        {type: "AsignarIp", id},
                        {type: "AsignarIp", id: "LIST"},
                    ]
                    : [{type: "AsignarIp", id: "LIST"}],
        }),
    }),
});

export const {
    useCreateAsignarIpMutation,
    useDeleteAsignarIpMutation,
    useEditAsignarIpMutation,
    useGetAsignarIpByIdQuery,
    useGetAsignarIpQuery,
    useLazyGetAsignarIpByIdQuery,
} = asignarIpApi;
