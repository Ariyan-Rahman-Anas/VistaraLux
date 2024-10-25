import { BillingInfo, CartItem, ShippingInfo, User } from "./types";

export interface UserReducerInitialState{
    isAuthenticated: boolean
    user: User | null
}
export interface CartReducerInitialState{
    loading: boolean
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
    tax: number
    shippingCharge: number
    discount: number
    subtotal: number
    total: number
    cartItems: CartItem[]
}