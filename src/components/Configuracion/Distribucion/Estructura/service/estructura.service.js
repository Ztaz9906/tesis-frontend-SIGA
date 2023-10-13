import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const estructuraApi = createApi({
	reducerPath: "estructuraApi",
	baseQuery: customFetchBase,
	tagTypes: ["estructura"],
	endpoints: (builder) => ({
		getEstructuras: builder.query({
			query: (filters) => {
				let baseURL = "/Distribucion_TbStructure/";
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
							type: "estructura",
							id,
						})),
						{type: "estructura", id: "LIST"},
					]
					: [{type: "estructura", id: "LIST"}],
		}),

		getEstructuraById: builder.query({
			query: (id) => ({
				url: `/Distribucion_TbStructure/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "estructura", id}],
		}),

		createEstructura: builder.mutation({
			query: (estructura) => ({
				url: "/Distribucion_TbStructure/",
				method: "POST",
				body: estructura,
			}),
			invalidatesTags: [{type: "estructura", id: "LIST"}],
		}),

		deleteEstructura: builder.mutation({
			query: (id) => ({
				url: `/Distribucion_TbStructure/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "estructura", id: "LIST"}],
		}),

		editEstructura: builder.mutation({
			query: (body) => ({
				url: `/Distribucion_TbStructure/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "estructura", id},
						{type: "estructura", id: "LIST"},
					]
					: [{type: "estructura", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateEstructuraMutation,
	useDeleteEstructuraMutation,
	useEditEstructuraMutation,
	useGetEstructuraByIdQuery,
	useGetEstructurasQuery,
	useLazyGetEstructuraByIdQuery,
} = estructuraApi;
