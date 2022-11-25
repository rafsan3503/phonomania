import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";

const DashboardLayout = () => {
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
            <li>
              <Link to="/dashboard">My Orders</Link>
            </li>
            <li>
              <Link to="/dashboard/addproduct">Add a product</Link>
            </li>
            <li>
              <Link to="/dashboard/myproducts">My Products</Link>
            </li>
            <li>
              <Link to="/dashboard/allbuyer">All Buyers</Link>
            </li>
            <li>
              <Link to="/dashboard/allseller">All Sellers</Link>
            </li>
            <li>
              <Link to="/dashboard/reportedItems">Reported Items</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
