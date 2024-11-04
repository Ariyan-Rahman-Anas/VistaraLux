import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminDashboardStatsResponse, BarChartsResponse, LineChartsResponse, PieChartsResponse } from "../../types/api-types";

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL}/admin`,
        credentials:"include"
    }),
    endpoints: builder => ({
        stats: builder.query<AdminDashboardStatsResponse, string>({
            query: () => "/dashboard-stats",
            keepUnusedDataFor:0
        }),
        pieCharts: builder.query<PieChartsResponse, string> ({
            query: () => "/pie-charts",
            keepUnusedDataFor: 0
        }),
        barCharts: builder.query<BarChartsResponse, string> ({
            query: () => "/bar-charts",
            keepUnusedDataFor: 0
        }),
        lineCharts: builder.query<LineChartsResponse, string>({
            query: () => "/line-charts",
            keepUnusedDataFor: 0
        })
    })
})

export const {
    useStatsQuery,
    usePieChartsQuery,
    useBarChartsQuery,
    useLineChartsQuery
} = dashboardApi