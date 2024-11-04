import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, UsersResponse } from "../../types/api-types";
import { User } from "../../types/types";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/user`, 
        credentials: "include",
    }),
    tagTypes: ["user"],
    endpoints: (builder) => ({
        signUp: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "/create-user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["user"]
        }),
        signIn: builder.mutation({
            query: (user) => ({
                url: "/login-user",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["user"]
        }),
        signOut: builder.mutation<void, void>({
            query: () => ({
                url: "/logout-user",
                method: "POST",
            }),
            invalidatesTags: ["user"]
        }),
        getAllUser: builder.query<UsersResponse, string> ({
            query: () => "/all-user",
            providesTags:["user"]
        }),
        updateProfile: builder.mutation({
            query: ({ id, formDataObj }) => ({
                url: `/${id}`,
                method: "PUT",
                body: formDataObj
            }),
            invalidatesTags: ["user"]
        }) ,
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["user"]
        })
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    useSignOutMutation,
    useGetAllUserQuery,
    useUpdateProfileMutation,
    useDeleteUserMutation
} = userApi;