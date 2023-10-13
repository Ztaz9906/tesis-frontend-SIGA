import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "@/services/config/customFetchBase.jsx";

export const usuarioApi = createApi({
	reducerPath: "usuarioApi",
	baseQuery: customFetchBase,
	tagTypes: ["Usuario"],
	endpoints: (builder) => ({
		getUsuarios: builder.query({
			query: (filters) => {
				let baseURL = "/api/management/usuarios/";
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
							type: "Usuario",
							id,
						})),
						{type: "Usuario", id: "LIST"},
					]
					: [{type: "Usuario", id: "LIST"}],
		}),

		getUsuarioById: builder.query({
			query: (id) => ({
				url: `/api/management/usuarios/${id}/`,
				method: "GET",
			}),
			providesTags: (result, error, id) => [{type: "Usuario", id}],
		}),

		createUsuario: builder.mutation({
			query: (Usuario) => ({
				url: "/api/management/usuarios/",
				method: "POST",
				body: Usuario,
			}),
			invalidatesTags: [{type: "Usuario", id: "LIST"}],
		}),

		deleteUsuario: builder.mutation({
			query: (id) => ({
				url: `/api/management/usuarios/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: [{type: "Usuario", id: "LIST"}],
		}),

		editUsuario: builder.mutation({
			query: (body) => ({
				url: `/api/management/usuarios/${body.id}/`,
				method: "PATCH",
				body,
			}),
			invalidatesTags: (result, error, {id}) =>
				result
					? [
						{type: "Usuario", id},
						{type: "Usuario", id: "LIST"},
					]
					: [{type: "Usuario", id: "LIST"}],
		}),
	}),
});

export const {
	useCreateUsuarioMutation,
	useDeleteUsuarioMutation,
	useEditUsuarioMutation,
	useGetUsuarioByIdQuery,
	useGetUsuariosQuery,
	useLazyGetUsuarioByIdQuery,
} = usuarioApi;