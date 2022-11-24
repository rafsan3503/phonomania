import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layouts/Auth";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import Login from "../Pages/Auth/Login";
import SigUp from "../Pages/Auth/SigUp";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller/AllSeller";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import CategoriesProduct from "../Pages/Home/CategoriesProduct";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Others/Blogs";
import ErrorPage from "../Pages/Shared/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/categories/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.id}`),
        element: <CategoriesProduct></CategoriesProduct>,
      },
    ],
  },
  {
    path: "/login",
    element: <Auth />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/login/signup",
        element: <SigUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/allbuyer",
        element: <AllBuyer />,
      },
      {
        path: "/dashboard/allseller",
        element: <AllSeller />,
      },
    ],
  },
]);

export default router;
