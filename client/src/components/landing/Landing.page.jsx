import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import { Link } from "react-router-dom";
import { LanguageContext } from "../../contexts/language-context";
import Features from "./features/Features.component";
import AppContainer from "../../app/AppContainer.styled";
import LandingTitle from "./LandingTitle.styled";
import H2 from "../texts/H2.styled";
import LoginWithGoogle from "./LoginWithGoogle.component";
import Centered from "../div/Centered.styled";
import VerticalFlexbox from "../div/VerticalFlexbox.styled";
import ButtonContainer from "../buttons/ButtonContainer.styled";
import MainButton from "../buttons/MainButton.styled";
import PageHr from "../separators/PageHr.styled";

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
          <H2 margin="30px 15px 0 15px">{home.register}</H2>
          <Centered margin="40px 0 0 0">
            <LoginWithGoogle />
          </Centered>
          <PageHr />
          <VerticalFlexbox margin="0 auto 40px auto">
            <H2 margin="30px 15px 0 15px">{home.discover}</H2>
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
