import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layouts/Auth";
import Main from "../Layouts/Main";
import Login from "../Pages/Auth/Login";
import SigUp from "../Pages/Auth/SigUp";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Others/Blogs";
import ErrorPage from "../Pages/Shared/ErrorPage";

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
]);

export default router;
