import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/language-context";
import Features from "./features/Features.component";
import AppContainer from "../../app/AppContainer.styled";
import HomeHr from "../separators/HomeHr.styled";
import LandingTitle from "./LandingTitle.styled";
import H1 from "../texts/H1.styled";
import LoginWithGoogle from "./LoginWithGoogle.component";
import Centered from "../div/Centered.styled";
import VerticalFlexbox from "../div/VerticalFlexbox.styled";
import ButtonContainer from "../buttons/ButtonContainer.styled";
import MainButton from "../buttons/MainButton.styled";

const Landing = () => {
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue },
  } = theme;

  return (
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
            <Link to="/curriculum">
              <ButtonContainer large margin="40px 0 0 0">
                <MainButton color={darkBlue} type="button">
                  {home.discover_button}
                </MainButton>
              </ButtonContainer>
            </Link>
            <Link to="/about">
              <ButtonContainer large margin="10px 0 0 0">
                <MainButton color={darkBlue} type="button">
                  {home.about}
                </MainButton>
              </ButtonContainer>
            </Link>
          </VerticalFlexbox>
        </AppContainer>
      )}
    </LanguageContext.Consumer>
  );
};

export default Landing;
