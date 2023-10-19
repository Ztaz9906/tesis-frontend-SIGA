import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase.jsx";

export const valoresconfiguracionComensalesApi = createApi({
	reducerPath: "valoresconfiguracionComensalesApi",
	baseQuery: customFetchBase,
	tagTypes: ["ValoresValoresConfiguracionComensales"],
	endpoints: (builder) => ({
		getValoresConfiguracionComensales: builder.query({
			query: (filters) => {
				let baseURL = "/Configuracion_TbDvaloresConfiguracionPersona/";
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
							type: "ValoresConfiguracionComensales",
							id,
						})),
						{type: "ValoresConfiguracionComensales", id: "LIST"},
					]
					: [{type: "ValoresConfiguracionComensales", id: "LIST"}],
		}),

		getValoresConfiguracionComensalesById: builder.query({
			query: (id) => ({
				url: `/Configuracion_TbDvaloresConfiguracionPersona/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ValoresConfiguracionComensales", id}],
		}),

		createValoresConfiguracionComensales: builder.mutation({
			query: (ValoresConfiguracionComensales) => ({
				url: "/Configuracion_TbDvaloresConfiguracionPersona/",
				method: "POST",
				body: ValoresConfiguracionComensales,
			}),
			invalidatesTags: [{type: "ValoresConfiguracionComensales", id: "LIST"}],
		}),

		deleteValoresConfiguracionComensales: builder.mutation({
			query: (id) => ({
				url: `/Configuracion_TbDvaloresConfiguracionPersona/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ValoresConfiguracionComensales", id: "LIST"}],
		}),

		editValoresConfiguracionComensales: builder.mutation({
			query: (body) => ({
				url: `/Configuracion_TbDvaloresConfiguracionPersona/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ValoresConfiguracionComensales", id},
						{type: "ValoresConfiguracionComensales", id: "LIST"},
					]
					: [{type: "ValoresConfiguracionComensales", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateValoresConfiguracionComensalesMutation,
	useDeleteValoresConfiguracionComensalesMutation,
	useEditValoresConfiguracionComensalesMutation,
	useGetValoresConfiguracionComensalesByIdQuery,
	useGetValoresConfiguracionComensalesQuery,
	useLazyGetValoresConfiguracionComensalesByIdQuery,
} = valoresconfiguracionComensalesApi;
