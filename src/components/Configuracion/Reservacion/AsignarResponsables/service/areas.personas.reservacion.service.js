import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const asignaraPersonasAreasReservacionApi = createApi({
	reducerPath: "asignaraPersonasAreasReservacionApi",
	baseQuery: customFetchBase,
	tagTypes: ["AsociarPersonas"],
	endpoints: (builder) => ({
		getAsociarPersonas: builder.query({
			query: (filters) => {
				let baseURL = "/Reservacion_TbDresponsableAreaPersonas/";
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
							type: "AsociarPersonas",
							id,
						})),
						{type: "AsociarPersonas", id: "LIST"},
					]
					: [{type: "AsociarPersonas", id: "LIST"}],
		}),

		getAsociarPersonasById: builder.query({
			query: (id) => ({
				url: `/Reservacion_TbDresponsableAreaPersonas/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "AsociarPersonas", id}],
		}),

		createAsociarPersonas: builder.mutation({
			query: (AsociarPersonas) => ({
				url: "/Reservacion_TbDresponsableAreaPersonas/",
				method: "POST",
				body: AsociarPersonas,
			}),
			invalidatesTags: [{type: "AsociarPersonas", id: "LIST"}],
		}),

		deleteAsociarPersonas: builder.mutation({
			query: (id) => ({
				url: `/Reservacion_TbDresponsableAreaPersonas/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "AsociarPersonas", id: "LIST"}],
		}),

		editAsociarPersonas: builder.mutation({
			query: (body) => ({
				url: `/Reservacion_TbDresponsableAreaPersonas/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "AsociarPersonas", id},
						{type: "AsociarPersonas", id: "LIST"},
					]
					: [{type: "AsociarPersonas", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateAsociarPersonasMutation,
	useDeleteAsociarPersonasMutation,
	useEditAsociarPersonasMutation,
	useGetAsociarPersonasByIdQuery,
	useGetAsociarPersonasQuery,
	useLazyGetAsociarPersonasByIdQuery,
} = asignaraPersonasAreasReservacionApi;