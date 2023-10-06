import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: "",
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload
        },
        logoutSuccess: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = "";
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, updateSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;