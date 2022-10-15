import React from "react";
import { Outlet } from "react-router";
import SignIn from "../pages/SignIn";
import useAuthStatus from "../Hooks/useAuthStatus";

const PrivateRoute = (): JSX.Element => {
  const { isLoggedIn, isChecking } = useAuthStatus();

  if (isChecking) {
    return <h3 className="text-3xl font-bold text-center mt-12">Loading...</h3>;
  }

  //
  return <>{isLoggedIn ? <Outlet /> : <SignIn />}</>;
};

export default PrivateRoute;
