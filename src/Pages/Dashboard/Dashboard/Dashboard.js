import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="h-[60vh] flex justify-center items-center text-5xl font-bold">
      Welcome,{user.displayName}
    </div>
  );
};

export default Dashboard;
