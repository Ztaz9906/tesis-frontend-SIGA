import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";

export const solapinPerdidoApi = createApi({
	reducerPath: "solapinPerdidoApi",
	baseQuery: customFetchBase,
	tagTypes: ["SolapinPerdido"],
	endpoints: (builder) => ({
		getSolapinPerdidos: builder.query({
			query: (filters) => {
				let baseURL = "/Cajero_TbDsolapinPerdido/";
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
							type: "SolapinPerdido",
							id,
						})),
						{type: "SolapinPerdido", id: "LIST"},
					]
					: [{type: "SolapinPerdido", id: "LIST"}],
		}),

		getSolapinPerdidoById: builder.query({
			query: (id) => ({
				url: `/Cajero_TbDsolapinPerdido/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "SolapinPerdido", id}],
		}),

		createSolapinPerdido: builder.mutation({
			query: (SolapinPerdido) => ({
				url: "/Cajero_TbDsolapinPerdido/",
				method: "POST",
				body: SolapinPerdido,
			}),
			invalidatesTags: [{type: "SolapinPerdido", id: "LIST"}],
		}),

		deleteSolapinPerdido: builder.mutation({
			query: (id) => ({
				url: `/Cajero_TbDsolapinPerdido/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "SolapinPerdido", id: "LIST"}],
		}),

		editSolapinPerdido: builder.mutation({
			query: (body) => ({
				url: `/Cajero_TbDsolapinPerdido/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "SolapinPerdido", id},
						{type: "SolapinPerdido", id: "LIST"},
					]
					: [{type: "SolapinPerdido", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateSolapinPerdidoMutation,
	useDeleteSolapinPerdidoMutation,
	useEditSolapinPerdidoMutation,
	useGetSolapinPerdidoByIdQuery,
	useGetSolapinPerdidosQuery,
	useLazyGetSolapinPerdidoByIdQuery,
} = solapinPerdidoApi;