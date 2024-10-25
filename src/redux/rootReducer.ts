import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import cartReducer from "./reducers/cartReducer";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/dashboardApi";

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer
})
export default rootReducer