import { createSlice } from '@reduxjs/toolkit'

// Estado inicial
const initialState = {
    user: null,
    isLoggedIn: false,
    authToken: null,
    refreshToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isLoggedIn = true;
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            state.authToken = null;
            state.refreshToken = null;
        },
    },
})

// Acciones
export const { login, logout } = authSlice.actions

// Selectors
export const getUser = (state) => state.auth.user
export const getIsLoggedIn = (state) => state.auth.isLoggedIn
export const getAuthToken = (state) => state.auth.authToken
export const getRefreshToken = (state) => state.auth.refreshToken

export default authSlice.reducer

