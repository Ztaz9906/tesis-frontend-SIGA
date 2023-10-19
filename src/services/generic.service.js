import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";


export const genericApi = createApi({
    reducerPath: "genericApi",
    baseQuery: customFetchBase,
    tagTypes: ["Generic"],
    endpoints: (builder) => ({
        getItems: builder.query({
            query: ({endpoint, filters = {}}) => {
                let baseURL = `/${endpoint}/`;
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
            providesTags: (result, error, {endpoint}) =>
                result
                    ? result.map(({id}) => ({type: "Generic", id: `${endpoint}-${id}`}))
                    : [],
        }),
        getItemById: builder.query({
            query: ({endpoint, id}) => ({
                url: `/${endpoint}/${id}/`,
                method: "GET",
            }),
            providesTags: (result, error, {endpoint, id}) => [{type: "Generic", id: `${endpoint}-${id}`}],
        }),
        createItem: builder.mutation({
            query: ({endpoint, item}) => ({
                url: `/${endpoint}/`,
                method: "POST",
                body: item,
            }),
            invalidatesTags: (result, error, {endpoint}) => [{type: "Generic", id: `${endpoint}-LIST`}],
        }),
        deleteItem: builder.mutation({
            query: ({endpoint, id}) => ({
                url: `/${endpoint}/${id}/`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, {endpoint}) => [{type: "Generic", id: `${endpoint}-LIST`}],
        }),
        editItem: builder.mutation({
            query: ({endpoint, item}) => {
                return {
                    url: `/${endpoint}/${item.id}/`,
                    method: "PATCH",
                    body: item,
                };
            },
            invalidatesTags: (result, error, {endpoint, item}) => [
                {type: "Generic", id: `${endpoint}-${item.id}`},
                {type: "Generic", id: `${endpoint}-LIST`},
            ],
        }),
    }),
});

export const {
    useGetItemsQuery,
    useGetItemByIdQuery,
    useCreateItemMutation,
    useDeleteItemMutation,
    useEditItemMutation,
} = genericApi;
