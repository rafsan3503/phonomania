import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/UserContext";
import Loading from "../Pages/Shared/Loading";

const PrivateRoutes = ({ children }) => {
  // get user
  const { user, loading } = useContext(AuthContext);
  //   location
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoutes;
