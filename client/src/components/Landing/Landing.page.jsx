import React from "react";

import LoginButtons from "../home/home_for_guest/LoginButtons.component";
import Features from "./Features/Features.component";
import Register from "../home/home_for_guest/Register.component";
import Discover from "../home/home_for_guest/Discover.component";
import Container from "../../app/Container.styled";
import HomeHr from "../separators/HomeHr.styled";
import { LanguageContext } from "../../contexts/language-context";
import LandingTitle from "./LandingTitle.styled";

const Landing = () => (
  <LanguageContext.Consumer>
    {({ home }) => (
      <Container>
        <LandingTitle>{home.main_title}</LandingTitle>
        <Features />
        <Register />
        <LoginButtons />
        <HomeHr />
        <Discover />
      </Container>
    )}
  </LanguageContext.Consumer>
);

export default Landing;
