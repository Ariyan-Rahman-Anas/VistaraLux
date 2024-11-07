import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { userNotExist } from "./reducers/userReducer";
// import { userNotExist } from "./path/to/userSlice"; // Import your user actions here
// import { RootState } from "./path/to/store"; // Import your RootState type if needed

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`,
    credentials: "include", // Send cookies with each request
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).user?.user?.token; // Example: if you store token in state

        console.log("tokkk ", token)
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Extend the baseQuery to handle 401 errors
const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQueryWithAuth(args, api, extraOptions);

    // Check if a 401 error was returned from the server
    if (result.error && result.error.status === 401) {
        // Dispatch the logout action to clear state and localStorage
        api.dispatch(userNotExist()); // Clears auth state in Redux
        localStorage.clear(); // Optionally clear localStorage

        // Optional: redirect to login page
        window.location.href = "/sign-in"; // Or use react-router to navigate
    }

    return result;
};

export default baseQueryWithReAuth;