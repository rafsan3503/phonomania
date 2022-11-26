import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthProvider/UserContext";
import useAdmin from "../Hooks/useAdmin";
import useBuyer from "../Hooks/useBuyer";
import useSeller from "../Hooks/useSeller";
import Navbar from "../Pages/Shared/Navbar";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isSeller] = useSeller(user?.email);
  const [isAdmin] = useAdmin(user?.email);
  const [isBuyer] = useBuyer(user?.email);

  return (
    <div>
      <Navbar />
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-slate-200">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {isBuyer && (
              <li>
                <Link className="text-primary" to="/dashboard/myorders">
                  My Orders
                </Link>
              </li>
            )}
            {isSeller && (
              <>
                <li>
                  <Link className="text-primary" to="/dashboard/addproduct">
                    Add a product
                  </Link>
                </li>
                <li>
                  <Link className="text-primary" to="/dashboard/myproducts">
                    My Products
                  </Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link className="text-primary" to="/dashboard/allbuyer">
                    All Buyers
                  </Link>
                </li>
                <li>
                  <Link className="text-primary" to="/dashboard/allseller">
                    All Sellers
                  </Link>
                </li>
                <li>
                  <Link className="text-primary" to="/dashboard/reportedItems">
                    Reported Items
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
