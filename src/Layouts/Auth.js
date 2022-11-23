import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";

const Auth = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Auth;