import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const valoresconfiguracionCobroApi = createApi({
	reducerPath: "valoresconfiguracionCobroApi",
	baseQuery: customFetchBase,
	tagTypes: ["ValoresConfiguracionCobro"],
	endpoints: (builder) => ({
		getValoresConfiguracionCobros: builder.query({
			query: (filters) => {
				let baseURL = "/Cobro_TbNvaloresConfiguracionCobro/";
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
							type: "ValoresConfiguracionCobro",
							id,
						})),
						{type: "ValoresConfiguracionCobro", id: "LIST"},
					]
					: [{type: "ValoresConfiguracionCobro", id: "LIST"}],
		}),

		getValoresConfiguracionCobroById: builder.query({
			query: (id) => ({
				url: `/Cobro_TbNvaloresConfiguracionCobro/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ValoresConfiguracionCobro", id}],
		}),

		createValoresConfiguracionCobro: builder.mutation({
			query: (ValoresConfiguracionCobro) => ({
				url: "/Cobro_TbNvaloresConfiguracionCobro/",
				method: "POST",
				body: ValoresConfiguracionCobro,
			}),
			invalidatesTags: [{type: "ValoresConfiguracionCobro", id: "LIST"}],
		}),

		deleteValoresConfiguracionCobro: builder.mutation({
			query: (id) => ({
				url: `/Cobro_TbNvaloresConfiguracionCobro/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ValoresConfiguracionCobro", id: "LIST"}],
		}),

		editValoresConfiguracionCobro: builder.mutation({
			query: (body) => ({
				url: `/Cobro_TbNvaloresConfiguracionCobro/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ValoresConfiguracionCobro", id},
						{type: "ValoresConfiguracionCobro", id: "LIST"},
					]
					: [{type: "ValoresConfiguracionCobro", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateValoresConfiguracionCobroMutation,
	useDeleteValoresConfiguracionCobroMutation,
	useEditValoresConfiguracionCobroMutation,
	useGetValoresConfiguracionCobroByIdQuery,
	useGetValoresConfiguracionCobrosQuery,
	useLazyGetValoresConfiguracionCobroByIdQuery,
} = valoresconfiguracionCobroApi;