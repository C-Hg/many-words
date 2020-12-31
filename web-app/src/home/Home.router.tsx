import React from "react";

import Home from "./Home.page";

import LandingPage from "../landing/Landing.page";

// TODO: hasBegunLearning ? Landing, Home
const HomeRouter = () => {
  return <LandingPage />;
  // return isAuthenticated ? <Home /> : <LandingPage />;
};

export default HomeRouter;
