import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";

import HomePage from "./Home.page";

import GET_IS_USER_CONNECTED from "../user/graphql/getIsUserConnected.graphql.local";

const HomeRouter = () => {
  const navigate = useNavigate();
  const {
    data: { isUserConnected },
  } = useQuery(GET_IS_USER_CONNECTED);

  if (!isUserConnected) {
    navigate("/welcome");
  }

  return <HomePage />;
};

export default HomeRouter;
