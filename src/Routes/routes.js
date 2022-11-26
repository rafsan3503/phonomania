import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layouts/Auth";
import DashboardLayout from "../Layouts/DashboardLayout";
import Main from "../Layouts/Main";
import Login from "../Pages/Auth/Login";
import SigUp from "../Pages/Auth/SigUp";
import AddProduct from "../Pages/Dashboard/AddProduct/AddProduct";
import AllBuyer from "../Pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../Pages/Dashboard/AllSeller/AllSeller";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import Payments from "../Pages/Dashboard/MyOrders/Payments";
import MyProducts from "../Pages/Dashboard/MyProduct/MyProducts";
import ReportedItems from "../Pages/Dashboard/ReportedItems/ReportedItems";
import CategoriesProduct from "../Pages/Home/CategoriesProduct";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Others/Blogs";
import ErrorPage from "../Pages/Shared/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import BuyerRoutes from "./BuyerRoutes";
import PrivateRoutes from "./PrivateRoutes";
import SellerRoutes from "./SellerRoutes";

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
        path: "/home",
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
        element: (
          <PrivateRoutes>
            <CategoriesProduct></CategoriesProduct>
          </PrivateRoutes>
        ),
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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/myorders",
        element: (
          <BuyerRoutes>
            <MyOrders />
          </BuyerRoutes>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/orders/${params.id}`),
        element: (
          <BuyerRoutes>
            <Payments />
          </BuyerRoutes>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoutes>
            <MyProducts />
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoutes>
            <AddProduct />
          </SellerRoutes>
        ),
      },
      {
        path: "/dashboard/allbuyer",
        element: (
          <AdminRoutes>
            <AllBuyer />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/allseller",
        element: (
          <AdminRoutes>
            <AllSeller />
          </AdminRoutes>
        ),
      },
      {
        path: "/dashboard/reportedItems",
        element: (
          <AdminRoutes>
            <ReportedItems />
          </AdminRoutes>
        ),
      },
    ],
  },
]);

export default router;
