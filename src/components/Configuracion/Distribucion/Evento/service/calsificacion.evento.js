import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const clasificacioneventoApi = createApi({
	reducerPath: "clasificacioneventoApi",
	baseQuery: customFetchBase,
	tagTypes: ["ClasificacionEvento"],
	endpoints: (builder) => ({
		getClasificacionEventos: builder.query({
			query: (filters) => {
				let baseURL = "/Distribucion_TbNclasificacionEvento/";
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
							type: "ClasificacionEvento",
							id,
						})),
						{type: "ClasificacionEvento", id: "LIST"},
					]
					: [{type: "ClasificacionEvento", id: "LIST"}],
		}),

		getClasificacionEventoById: builder.query({
			query: (id) => ({
				url: `/Distribucion_TbNclasificacionEvento/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ClasificacionEvento", id}],
		}),

		createClasificacionEvento: builder.mutation({
			query: (ClasificacionEvento) => ({
				url: "/Distribucion_TbNclasificacionEvento/",
				method: "POST",
				body: ClasificacionEvento,
			}),
			invalidatesTags: [{type: "ClasificacionEvento", id: "LIST"}],
		}),

		deleteClasificacionEvento: builder.mutation({
			query: (id) => ({
				url: `/Distribucion_TbNclasificacionEvento/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ClasificacionEvento", id: "LIST"}],
		}),

		editClasificacionEvento: builder.mutation({
			query: (body) => ({
				url: `/Distribucion_TbNclasificacionEvento/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ClasificacionEvento", id},
						{type: "ClasificacionEvento", id: "LIST"},
					]
					: [{type: "ClasificacionEvento", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateClasificacionEventoMutation,
	useDeleteClasificacionEventoMutation,
	useEditClasificacionEventoMutation,
	useGetClasificacionEventoByIdQuery,
	useGetClasificacionEventosQuery,
	useLazyGetClasificacionEventoByIdQuery,
} = clasificacioneventoApi;
