import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import DetailProduct from "./pages/DetailProduct";
import CartPage from "../src/pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ShippingAddressScreen from "./pages/ShippingAddressScreen";
import SignUpPage from "./pages/SignUpPage";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import PaymentMethodScreen from "./pages/PaymentMethodScreen";
import OrderScreen from "./pages/OrderScreen";
import OrderHistoryScreen from "./pages/OrderHistoryScreen";
import ProfileScreen from "./pages/ProfileScreen";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminRoute from "./components/AdminRoute";
import ProductList from "./pages/ProductList";
import ProductEditScreen from "./pages/ProductEditScreen";
import OrderListScreen from "./pages/OrderListScreen";
import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import About from "./pages/About";
import BlogPage from "./pages/BlogPage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ReturnRefund from "./pages/ReturnRefund";
import CancellationPolicy from "./pages/CancellationPolicy";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/returnrefund" element={<ReturnRefund />} />
            <Route path="/cancellationpolicy" element={<CancellationPolicy />} />
            <Route path="/blogpage" element={<BlogPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search" element={<Shop />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/product/:slug" element={<DetailProduct />} />
            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            ></Route>
             <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductList />
                </AdminRoute>
              }
            ></Route>
             <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
             <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
