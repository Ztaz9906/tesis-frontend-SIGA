import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const asociarTarjetaApi = createApi({
	reducerPath: "asociarTarjetaApi",
	baseQuery: customFetchBase,
	tagTypes: ["AsociarTarjeta"],
	endpoints: (builder) => ({
		getAsociarTarjetas: builder.query({
			query: (filters) => {
				let baseURL = "/Cajero_TbRpersonaTarjeta/";
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
							type: "AsociarTarjeta",
							id,
						})),
						{type: "AsociarTarjeta", id: "LIST"},
					]
					: [{type: "AsociarTarjeta", id: "LIST"}],
		}),

		getAsociarTarjetaById: builder.query({
			query: (id) => ({
				url: `/Cajero_TbRpersonaTarjeta/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "AsociarTarjeta", id}],
		}),

		createAsociarTarjeta: builder.mutation({
			query: (AsociarTarjeta) => ({
				url: "/Cajero_TbRpersonaTarjeta/",
				method: "POST",
				body: AsociarTarjeta,
			}),
			invalidatesTags: [{type: "AsociarTarjeta", id: "LIST"}],
		}),

		deleteAsociarTarjeta: builder.mutation({
			query: (id) => ({
				url: `/Cajero_TbRpersonaTarjeta/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "AsociarTarjeta", id: "LIST"}],
		}),

		editAsociarTarjeta: builder.mutation({
			query: (body) => ({
				url: `/Cajero_TbRpersonaTarjeta/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "AsociarTarjeta", id},
						{type: "AsociarTarjeta", id: "LIST"},
					]
					: [{type: "AsociarTarjeta", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateAsociarTarjetaMutation,
	useDeleteAsociarTarjetaMutation,
	useEditAsociarTarjetaMutation,
	useGetAsociarTarjetaByIdQuery,
	useGetAsociarTarjetasQuery,
	useLazyGetAsociarTarjetaByIdQuery,
} = asociarTarjetaApi;
