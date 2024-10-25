import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: CartReducerInitialState = {
    loading: false,
    billingInfo: {
        userId: "",
        anyMessage: ""
    },
    shippingInfo: {
        address: "",
        city: "",
        state: "",
        zipCode: 0,
        country: "",
        mobile: 0
    },
    tax: 0,
    shippingCharge: 0,
    discount: 0,
    subtotal: 10,
    total: 0,
    cartItems: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            state.loading = true;

            const existingItem = state.cartItems.find(item => item._id === action.payload._id);

            // Check if the item is already in the cart
            if (existingItem) {
                // Increment the quantity and update the subtotal
                existingItem.quantity += 1;
                existingItem.subtotal = existingItem.quantity * existingItem.price;
            } else {
                // Add a new item to the cart
                state.cartItems.push({
                    ...action.payload,
                    subtotal: action.payload.quantity * action.payload.price,
                    quantity:action.payload.quantity
                });
            }

            // Update cart-level totals
            state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
            state.tax = (state.total * 0.04); // Assuming 4% tax
            state.shippingCharge = (state.total * 0.06); // Assuming 6% shipping charge

            state.loading = false;
        },

        removeCartItem: (state, action: PayloadAction<string>) => {
            state.loading = true;

            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);

            // Update cart-level totals
            state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
            state.tax = (state.total * 0.04); // Assuming 4% tax
            state.shippingCharge = (state.total * 0.06); // Assuming 6% shipping charge

            state.loading = false;
        },

        incrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(i => i._id === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                item.subtotal = item.quantity * item.price;

                // Update cart-level totals
                state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
                state.tax = (state.total * 0.04); // Assuming 4% tax
                state.shippingCharge = (state.total * 0.06); // Assuming 6% shipping charge
            }
        },

        decrementQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(i => i._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.subtotal = item.quantity * item.price;

                // Update cart-level totals
                state.total = state.cartItems.reduce((acc, item) => acc + item.subtotal, 0);
                state.tax = (state.total * 0.04); // Assuming 4% tax
                state.shippingCharge = (state.total * 0.06); // Assuming 6% shipping charge
            }
        },
        saveShippingInfo: (state, action:PayloadAction<ShippingInfo>) => {
          state.shippingInfo = action.payload  
        },
        resetCart:()=>initialState
    },
});

export const {
    addToCart,
    removeCartItem,
    incrementQuantity,
    decrementQuantity,
    saveShippingInfo,
    resetCart
} = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const getActiveItemsInCart = (state: RootState) => state.cart.cartItems;
export const getActiveItemsLengthInCart = (state: RootState) => state.cart.cartItems.length;