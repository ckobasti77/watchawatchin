import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import React from "react";

const SharedLayout = ({ signedInFlag }) => {
  return (
    <>
      <Navbar signedInFlag={signedInFlag} />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
