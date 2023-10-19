import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const responsableReservacionApi = createApi({
	reducerPath: "responsableReservacionApi",
	baseQuery: customFetchBase,
	tagTypes: ["ResponsableReservacion"],
	endpoints: (builder) => ({
		getResponsableReservaciones: builder.query({
			query: (filters) => {
				let baseURL = "/Reservacion_TbDresponsableReservacion/";
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
							type: "ResponsableReservacion",
							id,
						})),
						{type: "ResponsableReservacion", id: "LIST"},
					]
					: [{type: "ResponsableReservacion", id: "LIST"}],
		}),

		getResponsableReservacionById: builder.query({
			query: (id) => ({
				url: `/Reservacion_TbDresponsableReservacion/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ResponsableReservacion", id}],
		}),

		createResponsableReservacion: builder.mutation({
			query: (ResponsableReservacion) => ({
				url: "/Reservacion_TbDresponsableReservacion/",
				method: "POST",
				body: ResponsableReservacion,
			}),
			invalidatesTags: [{type: "ResponsableReservacion", id: "LIST"}],
		}),

		deleteResponsableReservacion: builder.mutation({
			query: (id) => ({
				url: `/Reservacion_TbDresponsableReservacion/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ResponsableReservacion", id: "LIST"}],
		}),

		editResponsableReservacion: builder.mutation({
			query: (body) => ({
				url: `/Reservacion_TbDresponsableReservacion/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ResponsableReservacion", id},
						{type: "ResponsableReservacion", id: "LIST"},
					]
					: [{type: "ResponsableReservacion", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateResponsableReservacionMutation,
	useDeleteResponsableReservacionMutation,
	useEditResponsableReservacionMutation,
	useGetResponsableReservacionByIdQuery,
	useGetResponsableReservacionesQuery,
	useLazyGetResponsableReservacionByIdQuery,
} = responsableReservacionApi;