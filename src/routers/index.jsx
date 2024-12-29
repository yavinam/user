import React from "react";
import { useRoutes } from "react-router-dom";
import User from "../components/create_user";
import Users from "../pages/Users";

const Routers = () => {
  const routes = useRoutes([
    {
      path: "create-user",
      element: <User />,
    },
    {
      path: "/",
      element: <Users />,
    },
  ]);
  return routes;
};

export default Routers;
