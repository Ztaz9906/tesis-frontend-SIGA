import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";

export const torpedoApi = createApi({
    reducerPath: "torpedoApi",
    baseQuery: customFetchBase,
    tagTypes: ["Torpedo"],
    endpoints: (builder) => ({
        getTorpedos: builder.query({
            query: (filters) => {
                let baseURL = "/torpedo/";
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
                            type: "Torpedo",
                            id,
                        })),
                        {type: "Torpedo", id: "LIST"},
                    ]
                    : [{type: "Torpedo", id: "LIST"}],
        }),

        getTorpedoById: builder.query({
            query: (id) => ({
                url: `/torpedo/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{type: "Torpedo", id}],
        }),

        createTorpedo: builder.mutation({
            query: (Torpedo) => ({
                url: "/torpedo/",
                method: "POST",
                body: Torpedo,
            }),
            invalidatesTags: [{type: "Torpedo", id: "LIST"}],
        }),

        deleteTorpedo: builder.mutation({
            query: (id) => ({
                url: `/torpedo/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Torpedo", id: "LIST"}],
        }),

        editTorpedo: builder.mutation({
            query: (body) => ({
                url: `/torpedo/${body.id}/`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (result, error, {id}) =>
                result
                    ? [
                        {type: "Torpedo", id},
                        {type: "Torpedo", id: "LIST"},
                    ]
                    : [{type: "Torpedo", id: "LIST"}],
        }),
    }),
});

export const {
    useCreateTorpedoMutation,
    useDeleteTorpedoMutation,
    useEditTorpedoMutation,
    useGetTorpedoByIdQuery,
    useGetTorpedosQuery,
    useLazyGetTorpedoByIdQuery,
} = torpedoApi;