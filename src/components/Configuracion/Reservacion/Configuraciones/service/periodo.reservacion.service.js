import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const periodoReservacionApi = createApi({
	reducerPath: "periodoReservacionApi",
	baseQuery: customFetchBase,
	tagTypes: ["PeriodoReservacion"],
	endpoints: (builder) => ({
		getPeriodoReservaciones: builder.query({
			query: (filters) => {
				let baseURL = "/Reservacion_TbDperiodoReservacion/";
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
							type: "PeriodoReservacion",
							id,
						})),
						{type: "PeriodoReservacion", id: "LIST"},
					]
					: [{type: "PeriodoReservacion", id: "LIST"}],
		}),

		getPeriodoReservacionById: builder.query({
			query: (id) => ({
				url: `/Reservacion_TbDperiodoReservacion/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "PeriodoReservacion", id}],
		}),

		createPeriodoReservacion: builder.mutation({
			query: (PeriodoReservacion) => ({
				url: "/Reservacion_TbDperiodoReservacion/",
				method: "POST",
				body: PeriodoReservacion,
			}),
			invalidatesTags: [{type: "PeriodoReservacion", id: "LIST"}],
		}),

		deletePeriodoReservacion: builder.mutation({
			query: (id) => ({
				url: `/Reservacion_TbDperiodoReservacion/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "PeriodoReservacion", id: "LIST"}],
		}),

		editPeriodoReservacion: builder.mutation({
			query: (body) => ({
				url: `/Reservacion_TbDperiodoReservacion/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "PeriodoReservacion", id},
						{type: "PeriodoReservacion", id: "LIST"},
					]
					: [{type: "PeriodoReservacion", id: "LIST"}],
		}),
	}),
});

export const {
	useCreatePeriodoReservacionMutation,
	useDeletePeriodoReservacionMutation,
	useEditPeriodoReservacionMutation,
	useGetPeriodoReservacionByIdQuery,
	useGetPeriodoReservacionesQuery,
	useLazyGetPeriodoReservacionByIdQuery,
} = periodoReservacionApi;