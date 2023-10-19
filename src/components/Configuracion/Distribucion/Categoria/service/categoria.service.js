import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const categoriaApi = createApi({
	reducerPath: "categoriaApi",
	baseQuery: customFetchBase,
	tagTypes: ["categoria"],
	endpoints: (builder) => ({
		getCategorias: builder.query({
			query: (filters) => {
				let baseURL = "/Distribucion_TbCategory/";
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
							type: "categoria",
							id,
						})),
						{type: "categoria", id: "LIST"},
					]
					: [{type: "categoria", id: "LIST"}],
		}),

		getCategoriaById: builder.query({
			query: (id) => ({
				url: `/Distribucion_TbCategory/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "categoria", id}],
		}),

		createCategoria: builder.mutation({
			query: (categoria) => ({
				url: "/Distribucion_TbCategory/",
				method: "POST",
				body: categoria,
			}),
			invalidatesTags: [{type: "categoria", id: "LIST"}],
		}),

		deleteCategoria: builder.mutation({
			query: (id) => ({
				url: `/Distribucion_TbCategory/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "categoria", id: "LIST"}],
		}),

		editCategoria: builder.mutation({
			query: (body) => ({
				url: `/Distribucion_TbCategory/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "categoria", id},
						{type: "categoria", id: "LIST"},
					]
					: [{type: "categoria", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateCategoriaMutation,
	useDeleteCategoriaMutation,
	useEditCategoriaMutation,
	useGetCategoriaByIdQuery,
	useGetCategoriasQuery,
	useLazyGetCategoriaByIdQuery,
} = categoriaApi;
