import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UsersResponse } from "../../types/api-types";
import { User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`, 
        credentials: "include",
    }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        signUp: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "/create-user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"]
        }),
        signIn: builder.mutation({
            query: (user) => ({
                url: "/login-user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"]
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: "/logout-user",
                method: "POST",
            }),
            invalidatesTags: ["users"]
        }),
        getAllUser: builder.query<UsersResponse, string> ({
            query: () => "/all-user",
            providesTags:["users"]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["users"]
        })
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useGetAllUserQuery,
    useDeleteUserMutation
} = userApi;