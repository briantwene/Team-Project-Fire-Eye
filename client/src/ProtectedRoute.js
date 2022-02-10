import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const ProtectedRoute = ({ auth }) => {
  return auth ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
