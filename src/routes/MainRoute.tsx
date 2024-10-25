
// // Lazy load components for dashboard's management
// const AddNewProduct = lazy(() => import("./../pages/AdminDashboard/management/AddNewProduct"));
// const ProductManagement = lazy(() => import("./../pages/AdminDashboard/management/ProductManagement"));
// const TransactionManagement = lazy(() => import("./../pages/AdminDashboard/management/TransactionManagement"));

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./../components/Loader";
import ProtectedRoute from './ProtectedRoutes';
import NotFoundPage from './../pages/NotFoundPage';

// Lazy load components
const App = lazy(() => import("./../App"));
const HomePage = lazy(() => import("./../pages/home/HomePage"));
const ProductsPage = lazy(() => import("./../pages/products/ProductsPage"));
const ProductDetails = lazy(() => import("./../pages/productDetails/ProductDetails"));
const SignInPage = lazy(() => import("./../pages/auth/signIn/SignInPage"));
const SignUpPage = lazy(() => import("./../pages/auth/signUp/SignUpPage"));
const ShoppingCartPage = lazy(() => import("./../pages/shoppingCart/ShoppingCartPage"));
const CheckOutPage = lazy(() => import("../pages/checkOut/CheckOutPage"));
const MakePayment = lazy(() => import("../pages/checkOut/MakePayment"));
// const OrdersPage = lazy(() => import("../pages/UserDashboard/orders/UserOrdersPage"));

// Admin dashboard components
const AdminDashboardLayout = lazy(() => import("./../pages/AdminDashboard/AdminDashboardLayout"));
const AdminDashboard = lazy(() => import("./../pages/AdminDashboard/dashboard/AdminDashboard"));
const Products = lazy(() => import("./../pages/AdminDashboard/dashboard/Products"));
const AddNewProduct = lazy(() => import("./../pages/AdminDashboard/management/AddNewProduct"));
const ProductManagement = lazy(() => import("./../pages/AdminDashboard/management/ProductManagement"));
const Transaction = lazy(() => import("./../pages/AdminDashboard/dashboard/Transaction"));
const TransactionManagement = lazy(() => import("./../pages/AdminDashboard/management/TransactionManagement"));
const Customers = lazy(() => import("./../pages/AdminDashboard/dashboard/Customers"));
const CustomerProfile = lazy(() => import("./../pages/AdminDashboard/management/CustomerProfile"));
const BarChart = lazy(() => import("./../pages/AdminDashboard/charts/BarCharts"));
const PieChart = lazy(() => import("./../pages/AdminDashboard/charts/PieCharts"));
const LineChart = lazy(() => import("./../pages/AdminDashboard/charts/LineCharts"));
const Toss = lazy(() => import("./../pages/AdminDashboard/apps/Toss"));
const Coupon = lazy(() => import("./../pages/AdminDashboard/apps/Coupon"));
const Stopwatch = lazy(() => import("./../pages/AdminDashboard/apps/Stopwatch"));

// User dashboard components
const UserDashboardLayout = lazy(() => import("./../pages/UserDashboard/UserDashboardLayout"));
const UserProfile = lazy(() => import("./../pages/UserDashboard/profile/UserProfile"));
const UserDashboard = lazy(() => import("./../pages/UserDashboard/userDashboard/UserDashboard"));
const UserOrdersPage = lazy(() => import("./../pages/UserDashboard/orders/UserOrdersPage"));
const OrderDetails = lazy(() => import("./../pages/UserDashboard/orders/OrderDetails"));

// Define routes using createBrowserRouter with a single Suspense wrapper
const MainRoute = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<Loader />}>
                <App />
            </Suspense>
        ),
        errorElement: <NotFoundPage />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/products", element: <ProductsPage /> },
            { path: "/products/:id", element: <ProductDetails /> },
            {
                path: "/sign-in",
                element: (
                    <ProtectedRoute isPublic={true}>
                        <SignInPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/sign-up",
                element: (
                    <ProtectedRoute isPublic={true}>
                        <SignUpPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/shopping-cart",
                element: <ProtectedRoute>
                    <ShoppingCartPage />
                </ProtectedRoute>
            },
            {
                path: "/checkout", element: <ProtectedRoute>
                    <CheckOutPage />
                </ProtectedRoute>
            },
            { path: "/make-payment", element: <MakePayment /> },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRole="admin">
                <Suspense fallback={<Loader />}>
                    <AdminDashboardLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "products", element: <Products /> },
            { path: "products/new-product", element: <AddNewProduct /> },
            { path: "products/:id", element: <ProductManagement /> },
            { path: "transactions", element: <Transaction /> },
            { path: "transactions/:id", element: <TransactionManagement /> },
            { path: "customers", element: <Customers /> },
            { path: "customers/:id", element: <CustomerProfile /> },
            { path: "bar", element: <BarChart /> },
            { path: "pie", element: <PieChart /> },
            { path: "line", element: <LineChart /> },
            { path: "toss", element: <Toss /> },
            { path: "coupon", element: <Coupon /> },
            { path: "stopwatch", element: <Stopwatch /> },
        ],
    },
    {
        path: "/user",
        element: (
            <ProtectedRoute>
                <Suspense fallback={<Loader />}>
                    <UserDashboardLayout />
                </Suspense>
            </ProtectedRoute>
        ),
        children: [
            { path: "profile", element: <UserProfile /> },
            { path: "dashboard", element: <UserDashboard /> },
            { path: "orders", element: <UserOrdersPage /> },
            { path: "orders/:id", element: <OrderDetails /> },
        ],
    },
]);

export default MainRoute;