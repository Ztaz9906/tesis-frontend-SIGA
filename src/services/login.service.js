import { createApi } from "@reduxjs/toolkit/query/react";
import customFetchBase from "./config/customFetchBase";


export const loginLogOutApi = createApi({
  reducerPath: "loginLogOutApi",
  baseQuery: customFetchBase,
  tagTypes: ["loginLogOut"],
  endpoints: (builder) => ({
    Login: builder.mutation({
      query: (login) => ({
        url: "/api/login/",
        method: "POST",
        body: login,
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
     queryFulfilled
       .then((response) => {
         sessionStorage.setItem("token", response.data.access);
         sessionStorage.setItem("refresh", response.data.refresh);
         sessionStorage.setItem("user", JSON.stringify(response.data.user));
         sessionStorage.setItem("institucion", response.data.user.institucion.id)
       })
       .catch((error) => {
         // Manejar errores aquí si es necesario
       });
   },
      invalidatesTags: [{ type: "Login", id: "LIST" }],
    }),
    Logout: builder.mutation({
      query: (logout) => ({
        url: "/api/logout/",
        method: "POST",
        body: logout,
      }),
      onQueryStarted: (arg, { dispatch, queryFulfilled }) => {
     queryFulfilled
       .then((response) => {
         sessionStorage.removeItem("token");
         sessionStorage.removeItem("refresh");
         sessionStorage.removeItem("user");
         sessionStorage.removeItem("institucion")
       })
       .catch((error) => {
         // Manejar errores aquí si es necesario
       });
   },
      invalidatesTags: [{ type: "Logout", id: "LIST" }],
    }),


  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
} = loginLogOutApi;
