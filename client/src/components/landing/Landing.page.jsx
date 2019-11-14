import React from "react";

import Features from "./features/Features.component";
import AppContainer from "../../app/AppContainer.styled";
import HomeHr from "../separators/HomeHr.styled";
import { LanguageContext } from "../../contexts/language-context";
import LandingTitle from "./LandingTitle.styled";
import H1 from "../texts/H1.styled";
import LoginWithGoogle from "../home/home_for_guest/LoginWithGoogle.component";
import Centered from "../div/Centered.styled";
import VerticalFlexbox from "../div/VerticalFlexbox.styled";
import AboutButton from "../home/AboutButton.component";
import LinkButton from "../buttons/LinkButton";

const Landing = () => (
  <LanguageContext.Consumer>
    {({ home }) => (
      <AppContainer>
        <LandingTitle>{home.main_title}</LandingTitle>
        <Features />
        <H1>{home.register}</H1>
        <Centered margin="40px 0 0 0">
          <LoginWithGoogle />
        </Centered>
        <HomeHr />
        <VerticalFlexbox>
          <H1>{home.discover}</H1>
          <LinkButton to="/curriculum" title={home.discover_button} />
          {/* TODO: create a button class to replace AuthButtons
          and create button containers to fix the size */}
          <AboutButton contextualClass="discoverButton" />
        </VerticalFlexbox>
      </AppContainer>
    )}
  </LanguageContext.Consumer>
);

export default Landing;
