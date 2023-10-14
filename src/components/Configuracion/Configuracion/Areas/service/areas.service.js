import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase.jsx";

export const areasApi = createApi({
	reducerPath: "areasApi",
	baseQuery: customFetchBase,
	tagTypes: ["Area"],
	endpoints: (builder) => ({
		getAreas: builder.query({
			query: (filters) => {
				let baseURL = "/estructuras/";
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
							type: "Area",
							id,
						})),
						{type: "Area", id: "LIST"},
					]
					: [{type: "Area", id: "LIST"}],
		}),

		getAreaById: builder.query({
			query: (id) => ({
				url: `/estructuras/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "Area", id}],
		}),

		createArea: builder.mutation({
			query: (Area) => ({
				url: "/estructuras/",
				method: "POST",
				body: Area,
			}),
			invalidatesTags: [{type: "Area", id: "LIST"}],
		}),

		deleteArea: builder.mutation({
			query: (id) => ({
				url: `/estructuras/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "Area", id: "LIST"}],
		}),

		editArea: builder.mutation({
			query: (body) => ({
				url: `/estructuras/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "Area", id},
						{type: "Area", id: "LIST"},
					]
					: [{type: "Area", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateAreaMutation,
	useDeleteAreaMutation,
	useEditAreaMutation,
	useGetAreaByIdQuery,
	useGetAreasQuery,
	useLazyGetAreaByIdQuery,
} = areasApi;
