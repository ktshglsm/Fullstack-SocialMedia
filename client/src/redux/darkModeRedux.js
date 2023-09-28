import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
    name: "darkMode",
    initialState: {
        currentDarkMode: true,
    },
    reducers: {
        toggleTheme: (state) => {
            state.currentDarkMode = !state.currentDarkMode;
        },
    },
});

export const { toggleTheme } = darkModeSlice.actions;
export default darkModeSlice.reducer;