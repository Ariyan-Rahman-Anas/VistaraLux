import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionApi = createApi({
    reducerPath: "subscriptionApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/subscribe`,
        credentials: "include",
    }),
    tagTypes: ["subscribe"],
    endpoints: (builder) => ({
        doSubscribe: builder.mutation({
            query: (formData) => ({
                url: "/do-subscribe",
                method: "POST",
                body:formData
            }),
            invalidatesTags:["subscribe"]
        }),
        allSubscriber: builder.query({
            query: () => "/all",
            providesTags:["subscribe"]
        })
    })
})
export const {useDoSubscribeMutation, useAllSubscriberQuery} = subscriptionApi