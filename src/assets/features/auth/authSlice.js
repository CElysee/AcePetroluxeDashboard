import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        currentUser: null,
        userToken: null,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
            state.userToken = action.payload.access_token;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.userToken = null;
            state.isAuthenticated = false;
            // Dispatch the resetState action when logging out
            return state;
        },
        resetState: (state) => {
            // Reset the state to its initial state
            return {
                isAuthenticated: false,
                currentUser: null,
                userToken: null,
                error: null,
            };
        },
    },
});

export const { login, logout, resetState } = userSlice.actions;

export const selectUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default userSlice.reducer;