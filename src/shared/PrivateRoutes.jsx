import React from "react";
import { Outlet, Navigate } from "react-router";

const PrivateRoutes = () => {
  const isLogin = localStorage.getItem("email");

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
