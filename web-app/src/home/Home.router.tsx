import React from "react";
import { Redirect } from "react-router-dom";

import Home from "./Home.page";

// TODO: hasBegunLearning ? Landing, Home
const HomeRouter = () => <Redirect to="/welcome" />;
// return isAuthenticated ? <Home /> : <Redirect to="/welcome" />;

export default HomeRouter;
