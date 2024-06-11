import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AppProvider } from "./context/AppContext";
import PrivateRoute from "./routes/PrivateRoute";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import Users from "./pages/Users/Users";
import Orders from "./pages/Orders/Orders";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Invoice from "./pages/Invoice/Invoice";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/Login/Login";
import NotFound from "./pages/404/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <ToastContainer />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/category" element={<Categories />} />
              {/* <Route path='/togar' element={<Togar />} /> */}
              <Route path="/users" element={<Users />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/orders/invoice/:id" element={<Invoice />} />
            </Route>
            {/* <Route path='/coupons' element={<Coupons />} /> */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
