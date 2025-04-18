import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserReducerInitialState } from "../../types/reducer-types";
import { User } from "../../types/types";
import { RootState } from "../store";
// import { RootState } from "@reduxjs/toolkit/query";

const initialState: UserReducerInitialState = {
    isAuthenticated: false,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userExist: (state, action: PayloadAction<User>) => {
            state.isAuthenticated=true
            state.user = action.payload; 
        },
        userNotExist: (state) => {
            state.isAuthenticated = false;
            state.user = null; 
        },
        updateUserProfile: (state, action: PayloadAction<User>) => {
           state.user = action.payload ;
            
        },
    },
});
export const { userExist, userNotExist, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;


// Selector for authenticated user
export const selectAuthenticatedUser = (state: RootState) => state.user.user?.user;