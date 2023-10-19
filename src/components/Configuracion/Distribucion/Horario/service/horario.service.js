import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "../../../../../services/config/customFetchBase";


export const horarioApi = createApi({
	reducerPath: "horarioApi",
	baseQuery: customFetchBase,
	tagTypes: ["Horario"],
	endpoints: (builder) => ({
		getHorarios: builder.query({
			query: (filters) => {
				let baseURL = "/Distribucion_TbNhorario/";
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
							type: "Horario",
							id,
						})),
						{type: "Horario", id: "LIST"},
					]
					: [{type: "Horario", id: "LIST"}],
		}),

		getHorarioById: builder.query({
			query: (id) => ({
				url: `/Distribucion_TbNhorario/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "Horario", id}],
		}),

		createHorario: builder.mutation({
			query: (Horario) => ({
				url: "/Distribucion_TbNhorario/",
				method: "POST",
				body: Horario,
			}),
			invalidatesTags: [{type: "Horario", id: "LIST"}],
		}),

		deleteHorario: builder.mutation({
			query: (id) => ({
				url: `/Distribucion_TbNhorario/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "Horario", id: "LIST"}],
		}),

		editHorario: builder.mutation({
			query: (body) => ({
				url: `/Distribucion_TbNhorario/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "Horario", id},
						{type: "Horario", id: "LIST"},
					]
					: [{type: "Horario", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateHorarioMutation,
	useDeleteHorarioMutation,
	useEditHorarioMutation,
	useGetHorarioByIdQuery,
	useGetHorariosQuery,
	useLazyGetHorarioByIdQuery,
} = horarioApi;
