import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const tipotarjetaApi = createApi({
	reducerPath: "tipotarjetaApi",
	baseQuery: customFetchBase,
	tagTypes: ["TipoTarjeta"],
	endpoints: (builder) => ({
		getTipoTarjetas: builder.query({
			query: (filters) => {
				let baseURL = "/Cajero_TbNtipoTarjeta/";
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
							type: "TipoTarjeta",
							id,
						})),
						{type: "TipoTarjeta", id: "LIST"},
					]
					: [{type: "TipoTarjeta", id: "LIST"}],
		}),

		getTipoTarjetaById: builder.query({
			query: (id) => ({
				url: `/Cajero_TbNtipoTarjeta/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "TipoTarjeta", id}],
		}),

		createTipoTarjeta: builder.mutation({
			query: (TipoTarjeta) => ({
				url: "/Cajero_TbNtipoTarjeta/",
				method: "POST",
				body: TipoTarjeta,
			}),
			invalidatesTags: [{type: "TipoTarjeta", id: "LIST"}],
		}),

		deleteTipoTarjeta: builder.mutation({
			query: (id) => ({
				url: `/Cajero_TbNtipoTarjeta/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "TipoTarjeta", id: "LIST"}],
		}),

		editTipoTarjeta: builder.mutation({
			query: (body) => ({
				url: `/Cajero_TbNtipoTarjeta/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "TipoTarjeta", id},
						{type: "TipoTarjeta", id: "LIST"},
					]
					: [{type: "TipoTarjeta", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateTipoTarjetaMutation,
	useDeleteTipoTarjetaMutation,
	useEditTipoTarjetaMutation,
	useGetTipoTarjetaByIdQuery,
	useGetTipoTarjetasQuery,
	useLazyGetTipoTarjetaByIdQuery,
} = tipotarjetaApi;
