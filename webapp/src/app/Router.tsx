import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import About from "../about/About.page";
import MyAccount from "../account/myAccount.page";
import Exercise from "../exercise/Exercise.page";
import Home from "../home/Home.router";
import LandingPage from "../home/landing/Landing.page";

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/about" element={<About />} />
      <Route path="/home" element={<Home />} />
      <Route path="/learn" element={<Exercise />} />
      <Route path="/myAccount" element={<MyAccount />} />
      <Route path="/welcome" element={<LandingPage />} />
    </Routes>
  );
};

export default Router;
