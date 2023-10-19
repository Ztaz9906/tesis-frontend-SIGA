import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const procesoReservacionApi = createApi({
	reducerPath: "procesoReservacionApi",
	baseQuery: customFetchBase,
	tagTypes: ["ProcesoReservacion"],
	endpoints: (builder) => ({
		getProcesoReservaciones: builder.query({
			query: (filters) => {
				let baseURL = "/Configuracion_TbDconfiguracionProceso/";
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
							type: "ProcesoReservacion",
							id,
						})),
						{type: "ProcesoReservacion", id: "LIST"},
					]
					: [{type: "ProcesoReservacion", id: "LIST"}],
		}),

		getProcesoReservacionById: builder.query({
			query: (id) => ({
				url: `/Configuracion_TbDconfiguracionProceso/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "ProcesoReservacion", id}],
		}),

		createProcesoReservacion: builder.mutation({
			query: (ProcesoReservacion) => ({
				url: "/Configuracion_TbDconfiguracionProceso/",
				method: "POST",
				body: ProcesoReservacion,
			}),
			invalidatesTags: [{type: "ProcesoReservacion", id: "LIST"}],
		}),

		deleteProcesoReservacion: builder.mutation({
			query: (id) => ({
				url: `/Configuracion_TbDconfiguracionProceso/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "ProcesoReservacion", id: "LIST"}],
		}),

		editProcesoReservacion: builder.mutation({
			query: (body) => ({
				url: `/Configuracion_TbDconfiguracionProceso/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "ProcesoReservacion", id},
						{type: "ProcesoReservacion", id: "LIST"},
					]
					: [{type: "ProcesoReservacion", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateProcesoReservacionMutation,
	useDeleteProcesoReservacionMutation,
	useEditProcesoReservacionMutation,
	useGetProcesoReservacionByIdQuery,
	useGetProcesoReservacionesQuery,
	useLazyGetProcesoReservacionByIdQuery,
} = procesoReservacionApi;