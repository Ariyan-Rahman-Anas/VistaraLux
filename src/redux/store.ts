import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";
import { orderApi } from "./api/OrderApi";
import { dashboardApi } from "./api/dashboardApi";


export const serverUrl = import.meta.env.VITE_SERVER_URL


// Persist config for Redux-Persist
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "cart"],  // Specify which reducers you want to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // Disable serializable check for redux-persist
        }).concat([loggerMiddleware, userApi.middleware, productApi.middleware, orderApi.middleware, dashboardApi.middleware ]),  // Add RTK Query middlewares
    devTools: process.env.NODE_ENV !== "production",  // Enable Redux DevTools in development
});

// Create a persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;