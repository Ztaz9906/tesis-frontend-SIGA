import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const configuracionCobroApi = createApi({
	reducerPath: "configuracionCobroApi",
	baseQuery: customFetchBase,
	tagTypes: ["ConfiguracionCobro"],
	endpoints: (builder) => ({
		getConfiguracionCobros: builder.query({
			query: (filters) => {
				let baseURL = "/Cobro_TbNconfiguracionCobro/";
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
							type: "ConfiguracionCobro",
							id,
						})),
						{type: "ConfiguracionCobro", id: "LIST"},
					]
					: [{type: "ConfiguracionCobro", id: "LIST"}],
		}),

		getConfiguracionCobroById: builder.query({
			query: (id) => ({
				url: `/Cobro_TbNconfiguracionCobro/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ConfiguracionCobro", id}],
		}),

		createConfiguracionCobro: builder.mutation({
			query: (ConfiguracionCobro) => ({
				url: "/Cobro_TbNconfiguracionCobro/",
				method: "POST",
				body: ConfiguracionCobro,
			}),
			invalidatesTags: [{type: "ConfiguracionCobro", id: "LIST"}],
		}),

		deleteConfiguracionCobro: builder.mutation({
			query: (id) => ({
				url: `/Cobro_TbNconfiguracionCobro/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ConfiguracionCobro", id: "LIST"}],
		}),

		editConfiguracionCobro: builder.mutation({
			query: (body) => ({
				url: `/Cobro_TbNconfiguracionCobro/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ConfiguracionCobro", id},
						{type: "ConfiguracionCobro", id: "LIST"},
					]
					: [{type: "ConfiguracionCobro", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateConfiguracionCobroMutation,
	useDeleteConfiguracionCobroMutation,
	useEditConfiguracionCobroMutation,
	useGetConfiguracionCobroByIdQuery,
	useGetConfiguracionCobrosQuery,
	useLazyGetConfiguracionCobroByIdQuery,
} = configuracionCobroApi;