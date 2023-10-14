import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase.jsx";

export const tipoAreasApi = createApi({
	reducerPath: "tipoAreasApi",
	baseQuery: customFetchBase,
	tagTypes: ["TipoArea"],
	endpoints: (builder) => ({
		getTipoAreas: builder.query({
			query: (filters) => {
				let baseURL = "/tipo_estructuras/";
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
							type: "TipoArea",
							id,
						})),
						{type: "TipoArea", id: "LIST"},
					]
					: [{type: "TipoArea", id: "LIST"}],
		}),

		getTipoAreaById: builder.query({
			query: (id) => ({
				url: `/tipo_estructuras/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "TipoArea", id}],
		}),

		createTipoArea: builder.mutation({
			query: (TipoArea) => ({
				url: "/tipo_estructuras/",
				method: "POST",
				body: TipoArea,
			}),
			invalidatesTags: [{type: "TipoArea", id: "LIST"}],
		}),

		deleteTipoArea: builder.mutation({
			query: (id) => ({
				url: `/tipo_estructuras/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "TipoArea", id: "LIST"}],
		}),

		editTipoArea: builder.mutation({
			query: (body) => ({
				url: `/tipo_estructuras/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "TipoArea", id},
						{type: "TipoArea", id: "LIST"},
					]
					: [{type: "TipoArea", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateTipoAreaMutation,
	useDeleteTipoAreaMutation,
	useEditTipoAreaMutation,
	useGetTipoAreaByIdQuery,
	useGetTipoAreasQuery,
	useLazyGetTipoAreaByIdQuery,
} = tipoAreasApi;
