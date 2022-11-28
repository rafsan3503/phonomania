import React, { useContext } from "react";
import { AuthContext } from "../../../AuthProvider/UserContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex w-full h-screen items-center justify-center">
      <div className="mockup-phone">
        <div className="camera"></div>
        <div className="display">
          <div className="artboard artboard-demo phone-1">
            Hi.{user.displayName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
