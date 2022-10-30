import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../auth/Index";

export default function User() {
  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
}
