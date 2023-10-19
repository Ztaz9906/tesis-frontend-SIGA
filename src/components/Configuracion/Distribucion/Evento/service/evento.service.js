import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const eventoApi = createApi({
	reducerPath: "eventoApi",
	baseQuery: customFetchBase,
	tagTypes: ["Evento"],
	endpoints: (builder) => ({
		getEventos: builder.query({
			query: (filters) => {
				let baseURL = "/Distribucion_TbNevento/";
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
							type: "Evento",
							id,
						})),
						{type: "Evento", id: "LIST"},
					]
					: [{type: "Evento", id: "LIST"}],
		}),

		getEventoById: builder.query({
			query: (id) => ({
				url: `/Distribucion_TbNevento/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "Evento", id}],
		}),

		createEvento: builder.mutation({
			query: (Evento) => ({
				url: "/Distribucion_TbNevento/",
				method: "POST",
				body: Evento,
			}),
			invalidatesTags: [{type: "Evento", id: "LIST"}],
		}),

		deleteEvento: builder.mutation({
			query: (id) => ({
				url: `/Distribucion_TbNevento/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "Evento", id: "LIST"}],
		}),

		editEvento: builder.mutation({
			query: (body) => ({
				url: `/Distribucion_TbNevento/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "Evento", id},
						{type: "Evento", id: "LIST"},
					]
					: [{type: "Evento", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateEventoMutation,
	useDeleteEventoMutation,
	useEditEventoMutation,
	useGetEventoByIdQuery,
	useGetEventosQuery,
	useLazyGetEventoByIdQuery,
} = eventoApi;
