// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//     theme: localStorage.getItem('theme') || 'light',
// };

// const themeSlice = createSlice({
//     name: 'theme',
//     initialState,
//     reducers: {
//         setLightTheme: (state) => {
//             state.theme = 'light';
//             localStorage.setItem('theme', 'light');
//         },
//         setDarkTheme: (state) => {
//             state.theme = 'dark';
//             localStorage.setItem('theme', 'dark');
//         },
//         toggleTheme: (state) => {
//             state.theme = state.theme === 'light' ? 'dark' : 'light';
//             localStorage.setItem('theme', state.theme);
//         },
//     },
// });

// export const { setLightTheme, setDarkTheme, toggleTheme } = themeSlice.actions;
// export const selectTheme = (state) => state.theme.theme;
// export default themeSlice.reducer;







// src/redux/reducers/themeReducer.ts
import { createSlice } from '@reduxjs/toolkit';

// Get the initial theme from localStorage or default to "light"
const initialTheme = localStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialTheme,
    reducers: {
        setLightTheme: (state) => 'light',
        setDarkTheme: (state) => 'dark',
        toggleTheme: (state) => (state === 'light' ? 'dark' : 'light'),
    },
});

export const { setLightTheme, setDarkTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;