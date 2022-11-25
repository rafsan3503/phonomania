import React, { Children, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/UserContext";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Pages/Shared/Loading";

const AdminRoutes = ({ Children }) => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();
  if (isAdminLoading) {
    return <Loading />;
  }
  if (isAdmin) {
    return Children;
  }
  return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default AdminRoutes;
