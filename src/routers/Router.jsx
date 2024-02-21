import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/admin_screens/Dashboard/Dashboard";
import AdminUsers from "../components/admin_screens/Dashboard/Users";
import AdminCustomers from "../components/admin_screens/Dashboard/Customers";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Vendors from "../components/admin_screens/Dashboard/Vendors";
import PurchaseOrders from "../components/admin_screens/Dashboard/PurchaseOrders";
import PrivateRoutes from "../utils/PrivateRoutes.jsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoutes>
            <AdminDashboard />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/users"
        element={
          <PrivateRoutes>
            <AdminUsers />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/vendors"
        element={
          <PrivateRoutes>
            <Vendors />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <PrivateRoutes>
            <AdminCustomers />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/purchase-orders"
        element={
          <PrivateRoutes>
            <PurchaseOrders />
          </PrivateRoutes>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default Router;
