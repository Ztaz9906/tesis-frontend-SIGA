import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase.jsx";

export const configuracionComensalesApi = createApi({
	reducerPath: "configuracionComensalesApi",
	baseQuery: customFetchBase,
	tagTypes: ["ConfiguracionComensales"],
	endpoints: (builder) => ({
		getConfiguracionComensales: builder.query({
			query: (filters) => {
				let baseURL = "/Configuracion_TbDconfiguracionPersona/";
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
							type: "ConfiguracionComensales",
							id,
						})),
						{type: "ConfiguracionComensales", id: "LIST"},
					]
					: [{type: "ConfiguracionComensales", id: "LIST"}],
		}),

		getConfiguracionComensalesById: builder.query({
			query: (id) => ({
				url: `/Configuracion_TbDconfiguracionPersona/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ConfiguracionComensales", id}],
		}),

		createConfiguracionComensales: builder.mutation({
			query: (ConfiguracionComensales) => ({
				url: "/Configuracion_TbDconfiguracionPersona/",
				method: "POST",
				body: ConfiguracionComensales,
			}),
			invalidatesTags: [{type: "ConfiguracionComensales", id: "LIST"}],
		}),

		deleteConfiguracionComensales: builder.mutation({
			query: (id) => ({
				url: `/Configuracion_TbDconfiguracionPersona/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ConfiguracionComensales", id: "LIST"}],
		}),

		editConfiguracionComensales: builder.mutation({
			query: (body) => ({
				url: `/Configuracion_TbDconfiguracionPersona/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ConfiguracionComensales", id},
						{type: "ConfiguracionComensales", id: "LIST"},
					]
					: [{type: "ConfiguracionComensales", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateConfiguracionComensalesMutation,
	useDeleteConfiguracionComensalesMutation,
	useEditConfiguracionComensalesMutation,
	useGetConfiguracionComensalesByIdQuery,
	useGetConfiguracionComensalesQuery,
	useLazyGetConfiguracionComensalesByIdQuery,
} = configuracionComensalesApi;
