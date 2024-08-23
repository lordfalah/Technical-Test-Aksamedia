import React from "react";
import { useStoreAuth } from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";
import { TUser } from "../types/user.type";

const ProtectedRoute: React.FC = () => {
  const auth: TUser = JSON.parse(useStoreAuth()) || null;

  return auth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
