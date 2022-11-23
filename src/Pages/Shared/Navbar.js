import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import logo from "../../Assets/logo.png";
import { AuthContext } from "../../AuthProvider/UserContext";

const Navbar = () => {
  // get user from context
  const { user, logOut } = useContext(AuthContext);
  console.log(user);

  // logOut
  const handleLogout = () => {
    logOut().then((res) => {
      toast.success("log out success");
    });
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>
    </>
  );
  return (
    <div className="navbar backdrop-blur-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="normal-case text-xl">
          <img src={logo} className="w-24" alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div class="avatar online mr-5">
              <div class="w-20 rounded-full">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                  }
                  alt=""
                />
              </div>
            </div>
            <Link onClick={handleLogout} className="btn btn-sm">
              Log out
            </Link>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
