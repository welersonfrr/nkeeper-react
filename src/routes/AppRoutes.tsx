import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/SIgnup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const AppRoutes: React.FC = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default AppRoutes;
