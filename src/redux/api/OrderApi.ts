import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MessageResponse, NewOrderRequest, OrdersResponse, SingleOrderResponse, UpdateOrderRequest } from "../../types/api-types";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/order`,
        credentials: "include",
    }),
    tagTypes:["orders"],
    endpoints: (builder) => ({
        createNewOrder: builder.mutation<MessageResponse, NewOrderRequest >({
            query: (order) => ({
                url: "/new",
                method:"POST",
                body:order
            }),
            invalidatesTags:["orders"]
        }),
        myOrders: builder.query<OrdersResponse, string >({
            query: (id) => `/my?id=${id}`,
            providesTags:["orders"]
        }),
        allOrders: builder.query<OrdersResponse, string >({
            query: () => "/all",
            providesTags:["orders"]
        }),
        singleOrder: builder.query<SingleOrderResponse, string >({
            query: (id) => `/${id}`,
            providesTags:["orders"]
        }),
        updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: (id) => ({
                url: `/${id}`,
                method: "PUT",
                body: id
            }),
            invalidatesTags: ["orders"]
        }),
        deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["orders"]
        }),
    })
})

export const {
    useCreateNewOrderMutation,
    useMyOrdersQuery,
    useAllOrdersQuery,
    useSingleOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi