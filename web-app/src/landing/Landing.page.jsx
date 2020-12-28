import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import LandingTitle from "./LandingTitle.styled";
import Features from "./features/Features.component";

import AppContainer from "../app/AppContainer.styled";
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import NavigationLink from "../components/links/NavigationLink.styled";
import PageHr from "../components/separators/PageHr.styled";
import H2 from "../components/texts/H2.styled";
import { LanguageContext } from "../contexts/language-context";
import LandingPageNavbar from "../navbar/LandingPage.navbar";

// TODO: log in possibility

const Landing = () => {
  const language = useContext(LanguageContext);
  const { home } = language;
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue },
  } = theme;

  return (
    <AppContainer withNavbar>
      <LandingPageNavbar />
      <ScrollToTopOnMount />
      <LandingTitle>{home.mainTitle}</LandingTitle>
      <Features />
      <H2 margin="30px 15px 0 15px">{home.register}</H2>
      <PageHr />
      <VerticalFlexbox margin="0 auto 40px auto">
        <H2 margin="30px 15px 0 15px">{home.discover}</H2>
        <NavigationLink to="/learn">
          <ButtonContainer large margin="40px 0 0 0">
            <MainButton color={darkBlue} type="button">
              {home.discoverButton}
            </MainButton>
          </ButtonContainer>
        </NavigationLink>
        <NavigationLink to="/login">
          <ButtonContainer large margin="10px 0 0 0">
            <MainButton color={darkBlue} type="button">
              {home.login}
            </MainButton>
          </ButtonContainer>
        </NavigationLink>
      </VerticalFlexbox>
    </AppContainer>
  );
};

export default Landing;
