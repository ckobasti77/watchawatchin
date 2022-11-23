import { Outlet } from "react-router-dom";
import AuthNavbar from "./Navbar/AuthNavbar";
import AuthFooter from "./Footer/AuthFooter";
import React from "react";

const AuthSharedLayout = () => {
  return (
    <>
      <AuthNavbar />
      <Outlet />
      <AuthFooter />
    </>
  );
};

export default AuthSharedLayout;
