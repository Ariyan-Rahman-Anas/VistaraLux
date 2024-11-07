import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/dashboardApi";
import { wishlistApi } from "./api/wishlistApi";
import { subscriptionApi } from "./api/subscriptionApi";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart", "theme"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }).concat([
            loggerMiddleware,
            userApi.middleware,
            productApi.middleware,
            orderApi.middleware,
            wishlistApi.middleware,
            dashboardApi.middleware,
            subscriptionApi.middleware
        ]),
    devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;