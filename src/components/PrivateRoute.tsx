import React from "react";
import { Outlet } from "react-router";
import SignIn from "../pages/SignIn";
import useAuthStatus from "../Hooks/useAuthStatus";
import Spinner from "./Spinner";

const PrivateRoute = (): JSX.Element => {
  const { isLoggedIn, isChecking } = useAuthStatus();

  if (isChecking) {
    return <Spinner />;
  }

  //
  return <>{isLoggedIn ? <Outlet /> : <SignIn />}</>;
};

export default PrivateRoute;
