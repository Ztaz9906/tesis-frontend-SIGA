import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const elementomostrarApi = createApi({
	reducerPath: "elementomostrarApi",
	baseQuery: customFetchBase,
	tagTypes: ["ElementoMostrar"],
	endpoints: (builder) => ({
		getElementoMostrarse: builder.query({
			query: (filters) => {
				let baseURL = "/Reservacion_TbDelementosMostrar/";
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
							type: "ElementoMostrar",
							id,
						})),
						{type: "ElementoMostrar", id: "LIST"},
					]
					: [{type: "ElementoMostrar", id: "LIST"}],
		}),

		getElementoMostrarById: builder.query({
			query: (id) => ({
				url: `/Reservacion_TbDelementosMostrar/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ElementoMostrar", id}],
		}),

		createElementoMostrar: builder.mutation({
			query: (ElementoMostrar) => ({
				url: "/Reservacion_TbDelementosMostrar/",
				method: "POST",
				body: ElementoMostrar,
			}),
			invalidatesTags: [{type: "ElementoMostrar", id: "LIST"}],
		}),

		deleteElementoMostrar: builder.mutation({
			query: (id) => ({
				url: `/Reservacion_TbDelementosMostrar/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ElementoMostrar", id: "LIST"}],
		}),

		editElementoMostrar: builder.mutation({
			query: (body) => ({
				url: `/Reservacion_TbDelementosMostrar/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ElementoMostrar", id},
						{type: "ElementoMostrar", id: "LIST"},
					]
					: [{type: "ElementoMostrar", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateElementoMostrarMutation,
	useDeleteElementoMostrarMutation,
	useEditElementoMostrarMutation,
	useGetElementoMostrarByIdQuery,
	useGetElementoMostrarseQuery,
	useLazyGetElementoMostrarByIdQuery,
} = elementomostrarApi;