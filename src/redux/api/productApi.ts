import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateProductRequest, DeleteProductRequest, MessageResponse, ProductsResponse, SearchProductsQuery, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/product`,
        credentials: "include",
    }),
    tagTypes:["product"],
    endpoints: (builder) => ({
        categories: builder.query({
            query: () => "/categories",
            providesTags:["product"]
        }),
        latestProducts: builder.query<ProductsResponse, string>({
            query: () => "/latest",
            providesTags: ["product"]
        }),
        allProducts: builder.query<ProductsResponse, string>({
            query: () => "/admin-products",
            providesTags: ["product"]
        }),
        productsDetails: builder.query<ProductsResponse, string>({
            query: (id) => `/${id}`,
            providesTags: ["product"]
        }),
        searchProducts: builder.query<SearchProductsResponse, SearchProductsQuery>({
            query: ({ page, minPrice, maxPrice, category, search, sort }) => {
                let baseQuery = `all?search=${search}&page=${page}`
                if(minPrice) baseQuery += `&minPrice=${minPrice}`
                if(maxPrice) baseQuery += `&maxPrice=${maxPrice}`
                if (sort) baseQuery += `&sort=${sort}`
                if (category) baseQuery += `&category=${category}`
                return baseQuery
            },
            providesTags: ["product"]
        }),
        createProduct: builder.mutation<MessageResponse, CreateProductRequest>({
            query: ({ formData }) => ({
                url: "/new",
                method: "POST",
                body: formData,
            }),
            invalidatesTags:["product"]
        }),
        updateProduct: builder.mutation<MessageResponse, UpdateProductRequest>({
            query: ({ id, formData }) => ({
                url: `/${id}`,
                method: "PUT",
                body:formData
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct: builder.mutation <MessageResponse, DeleteProductRequest> ({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
                body: id
            }),
            invalidatesTags: ["product"]
        })
    })
})

export const {
    useCategoriesQuery,
    useLatestProductsQuery,
    useAllProductsQuery,
    useProductsDetailsQuery,
    useSearchProductsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productApi