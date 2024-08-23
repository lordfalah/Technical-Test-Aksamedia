import React, { Fragment } from "react";
import { type TUser } from "../types/user.type";
import { useStoreAuth } from "../store/authStore";
import { Navigate } from "react-router-dom";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth: TUser = JSON.parse(useStoreAuth()) || null;

  return isAuth ? (
    <Fragment>
      <Navigate to={"/dashboard"} replace />
    </Fragment>
  ) : (
    <Fragment>
      <header></header>
      {children}
    </Fragment>
  );
};

export default PublicRoute;
