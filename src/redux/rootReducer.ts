import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import themeReducer from "./reducers/themeReducer";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/dashboardApi";
import { wishlistApi } from "./api/wishlistApi";
import { subscriptionApi } from "./api/subscriptionApi";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    theme: themeReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,

    [dashboardApi.reducerPath]: dashboardApi.reducer
})
export default rootReducer