import { AdminDashboardStats, Bar, BillingInfo, Line, Order, OrderItem, Pie, Product, ShippingInfo, User } from "./types"

export type MessageResponse = {
    success: boolean
    message: string
    data?: object | []
}
export type ProductsResponse = {
    success: boolean
    message: string
    totalProducts:number
    products: Product[]
}
export type SearchProductsResponse = {
    success: boolean
    message: string
    totalPages: number
    totalItems: number
    products: Product[]
}
export type SearchProductsQuery = {
    page: number
    minPrice?: number;
    maxPrice?: number;
    category:string
    search:string
    sort:string
}
export type UsersResponse = {
    success: boolean
    message: string
    users: User[]
}
export type CreateProductRequest = {
    formData: FormData
}
export type UpdateProductRequest = {
    id:string
    formData: FormData
}
export type DeleteProductRequest = {
    id:string
}
export type NewOrderRequest = {
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
    tax: number
    discount: number
    shippingCharge: number
    total: number
    subtotal: number
    orderedItems: OrderItem
}
export type OrdersResponse = {
    success: boolean
    message: string
    totalOrder: number
    orders: Order[]
}
export type SingleOrderResponse = {
    success: boolean
    message: string
    orders: Order
}
export type UpdateOrderRequest = {
    orderId:string
}
export type AdminDashboardStatsResponse = {
    success: boolean
    message: string
    adminDashboardStats: AdminDashboardStats
}
export type PieChartsResponse = {
    success: boolean
    message: string
    pieCharts: Pie
}
export type BarChartsResponse = {
    success: boolean
    message: string
    barCharts: Bar
}
export type LineChartsResponse = {
    success: boolean
    message: string
    lineCharts: Line
}