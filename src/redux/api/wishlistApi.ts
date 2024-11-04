import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishlistApi = createApi({
    reducerPath: "wishlistApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/wishlist`,
        credentials: "include",
    }),
    tagTypes: ["wishlist"],
    endpoints: (builder) => ({
        addToWishlist: builder.mutation({
            query: (item) => ({
                url: "/new",
                method: "POST",
                body:item
            }),
            invalidatesTags:["wishlist"]
        }),
        wholeWishlistForAdmin: builder.query({
            query: () => "/all",
            providesTags:["wishlist"]
        }),
        anUserWishlist:builder.query({
            query: (id) => `/${id}`,
            providesTags:["wishlist"]
        }),
        deleteFromWishlist: builder.mutation({
            query: (ids) => ({
                url: "/delete",
                method: "DELETE",
                body:ids
            }),
            invalidatesTags: ["wishlist"]
        })
    })
})

export const {
    useAddToWishlistMutation,
    useWholeWishlistForAdminQuery,
    useAnUserWishlistQuery,
    useDeleteFromWishlistMutation
} = wishlistApi