import { useQuery } from "@apollo/client";
import React from "react";
import { Redirect } from "react-router-dom";

import HomePage from "./Home.page";

import GET_IS_USER_CONNECTED from "../user/graphql/getIsUserConnected.graphql.local";

const HomeRouter = () => {
  const {
    data: { isUserConnected },
  } = useQuery(GET_IS_USER_CONNECTED);

  if (!isUserConnected) {
    return <Redirect to="/welcome" />;
  }

  return <HomePage />;
};

export default HomeRouter;
