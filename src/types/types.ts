export type User ={
    _id:string
    name: string
    email: string
    password: string
    photo: string
    role: string
    gender: string
    dob:string
}

export type Product = {
    _id: string
    name: string
    category: string
    price: number
    stock: number
    photo:string
}

export type OrderItemType = {
    name: string,
    photo: string,
    price: number,
    quantity: number,
    productId:string
    _id: string
}

export type OrderType = {
    name: string,
    address: string,
    city: string,
    country: string,
    state: string,
    zipCode: number,
    status: "Processing" | "Shipped" | "Delivered",
    subtotal: number,
    discount: number,
    shippingCharge: number,
    tax: number,
    total: number,
    orderItems: OrderItemType[],
    _id: string
}

export type BillingInfo = {
    userId: string
    anyMessage: string
}
export type ShippingInfo = {
    address: string
    city: string
    state: string
    zipCode: number
    country: string
    mobile: number
}
export type CartItem = {
    _id:string
    name: string
    photo: string
    price: number
    quantity: number
    subtotal: number
    productId: string
    stock:number
}
export type OrderItem = Omit<CartItem, "stock"> & { _id: string }

export type Order = {
    _id:string
    billingInfo: BillingInfo
    shippingInfo: ShippingInfo
    tax: number
    shippingCharge:number
    discount:number
    subtotal:number
    total: number
    status: string
    orderedItems: OrderItem[]
}

type AuditAndAuditPercentages = {
    users: number
    products: number
    orders: number
    revenue: number
}
type Revenue = {
    revenue: number
}
type LatestTransaction = {
    _id: string
    discount: number;
    amount: number;
    quantity: number;
    status: string;
}
export type AdminDashboardStats = {
    audit: AuditAndAuditPercentages
    revenue: Revenue
    auditPercentages: AuditAndAuditPercentages
    charts: {
        order: number[]
        revenue: number[]
    },
    categoryCount:Record<string, number>[]
    userRatio: {
        male: number;
        female: number
    },
    latestTransaction: LatestTransaction
}

export type Pie = {
    orderFulfillment: {
        processing: number;
        shipped: number;
        delivered: number;
        allOrders: [];
    },
    productCategories: Record<string, number>[],
    stockAvailability: {
        inStock: number;
        outOfStock: number;
    },
    revenueDistribution: {
        netMargin: number;
        discount: number;
        productionCost: number;
        burnt: number;
        marketingCost: number;
    },
    usersAgeGroups: {
        teen: number;
        adult: number;
        old: number
    },
    adminCustomer: {
        admins: number;
        customers: number;
    }
}

export type Bar = {
    users: number[]
    products: number[]
    orders: number[]
}

export type Line = {
    users: number[]
    products: number[]
    discount: number[]
    revenue: number[]
}