import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/UserContext";
import useSeller from "../Hooks/useSeller";
import Loading from "../Pages/Shared/Loading";

const SellerRoutes = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();
  if (isSellerLoading) {
    return <Loading />;
  }
  if (isSeller) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoutes;
