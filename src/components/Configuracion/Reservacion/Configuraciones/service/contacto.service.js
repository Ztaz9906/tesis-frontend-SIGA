import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const contactoApi = createApi({
	reducerPath: "contactoApi",
	baseQuery: customFetchBase,
	tagTypes: ["Contacto"],
	endpoints: (builder) => ({
		getContactos: builder.query({
			query: (filters) => {
				let baseURL = "/Configuracion_TbDdatosContacto/";
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
							type: "Contacto",
							id,
						})),
						{type: "Contacto", id: "LIST"},
					]
					: [{type: "Contacto", id: "LIST"}],
		}),

		getContactoById: builder.query({
			query: (id) => ({
				url: `/Configuracion_TbDdatosContacto/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "Contacto", id}],
		}),

		createContacto: builder.mutation({
			query: (Contacto) => ({
				url: "/Configuracion_TbDdatosContacto/",
				method: "POST",
				body: Contacto,
			}),
			invalidatesTags: [{type: "Contacto", id: "LIST"}],
		}),

		deleteContacto: builder.mutation({
			query: (id) => ({
				url: `/Configuracion_TbDdatosContacto/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "Contacto", id: "LIST"}],
		}),

		editContacto: builder.mutation({
			query: (body) => ({
				url: `/Configuracion_TbDdatosContacto/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "Contacto", id},
						{type: "Contacto", id: "LIST"},
					]
					: [{type: "Contacto", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateContactoMutation,
	useDeleteContactoMutation,
	useEditContactoMutation,
	useGetContactoByIdQuery,
	useGetContactosQuery,
	useLazyGetContactoByIdQuery,
} = contactoApi;