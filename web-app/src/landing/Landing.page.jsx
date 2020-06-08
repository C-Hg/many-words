import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../contexts/language-context";
import AppContainer from "../app/AppContainer.styled";
import LandingTitle from "./LandingTitle.styled";
import Features from "./features/Features.component";
import H2 from "../components/texts/H2.styled";
import PageHr from "../components/separators/PageHr.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import HomeNavbar from "../navbar/Main.navbar";
import NavigationLink from "../components/links/NavigationLink.styled";

const Landing = () => {
  const language = useContext(LanguageContext);
  const { home } = language;
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue },
  } = theme;

  return (
    <AppContainer withNavbar>
      <HomeNavbar />
      <ScrollToTopOnMount />
      <LandingTitle>{home.mainTitle}</LandingTitle>
      <Features />
      <H2 margin="30px 15px 0 15px">{home.register}</H2>
      <PageHr />
      <VerticalFlexbox margin="0 auto 40px auto">
        <H2 margin="30px 15px 0 15px">{home.discover}</H2>
        <NavigationLink to="/curriculum">
          <ButtonContainer large margin="40px 0 0 0">
            <MainButton color={darkBlue} type="button">
              {home.discoverButton}
            </MainButton>
          </ButtonContainer>
        </NavigationLink>
        <NavigationLink to="/about">
          <ButtonContainer large margin="10px 0 0 0">
            <MainButton color={darkBlue} type="button">
              {home.about}
            </MainButton>
          </ButtonContainer>
        </NavigationLink>
      </VerticalFlexbox>
    </AppContainer>
  );
};

export default Landing;
