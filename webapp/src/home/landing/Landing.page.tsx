import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "styled-components";

import LandingTitle from "./LandingTitle.styled";
import Features from "./features/Features.component";

import ScrollToTopOnMount from "../../app/ScrollToTopOnMount.component";
import { isUserConnectedVar } from "../../cache";
import ButtonContainer from "../../components/buttons/ButtonContainer.styled";
import MainButton from "../../components/buttons/MainButton.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import NavigationLink from "../../components/links/NavigationLink.styled";
import PageHr from "../../components/separators/PageHr.styled";
import H2 from "../../components/texts/H2.styled";
import { LanguageContext } from "../../contexts/language-context";
import { useCreateWebUserMutation } from "../../graphql/types";

// TODO: log in possibility

const Landing = () => {
  const [createWebUser] = useCreateWebUserMutation();
  const navigate = useNavigate();
  const language = useContext(LanguageContext);
  const { home } = language;
  const theme = useContext(ThemeContext);
  const {
    colors: { darkBlue },
  } = theme;

  const startLearning = async (): Promise<void> => {
    const { data } = await createWebUser();
    if (data?.createWebUser?.success) {
      isUserConnectedVar(true);
      navigate("/learn");
    }
  };

  return (
    <>
      <ScrollToTopOnMount />
      <LandingTitle>{home.mainTitle}</LandingTitle>
      <Features />
      <H2 margin="30px 15px 0 15px">{home.register}</H2>
      <PageHr />
      <VerticalFlexbox margin="0 auto 40px auto">
        <H2 margin="30px 15px 0 15px">{home.discover}</H2>
        <ButtonContainer large margin="40px 0 0 0">
          <MainButton onClick={startLearning} color={darkBlue} type="button">
            {home.discoverButton}
          </MainButton>
        </ButtonContainer>
        <NavigationLink to="/login">
          <ButtonContainer large margin="10px 0 0 0">
            <MainButton color={darkBlue} type="button">
              {home.login}
            </MainButton>
          </ButtonContainer>
        </NavigationLink>
      </VerticalFlexbox>
    </>
  );
};

export default Landing;
