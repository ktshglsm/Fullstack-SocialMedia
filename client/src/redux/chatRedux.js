import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
    },
    reducers: {
        updateOnlineUsers: (state, action) => {
            state.onlineUsers = [...action.payload];
        },
    },
});

export const { updateOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;