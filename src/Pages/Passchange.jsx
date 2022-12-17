import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogin } from "../auth/Index";

function Passchange() {
  return (!isLogin() ? <Outlet /> : <Navigate to="/login"/>)
}

export default Passchange;
