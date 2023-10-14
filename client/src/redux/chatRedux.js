import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
        socket: null,
    },
    reducers: {
        updateOnlineUsers: (state, action) => {
            state.onlineUsers = [...action.payload];
        },
        updateSocketIo: (state, action) => {
            state.socket = action.payload;
        }
    },
});

export const { updateOnlineUsers, updateSocketIo } = chatSlice.actions;
export default chatSlice.reducer;