import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import GlobalProgress from "./progress/global/GlobalProgress.component";

import AppContainer from "../app/AppContainer.styled";
import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import NavigationLink from "../components/links/NavigationLink.styled";
import PageHr from "../components/separators/PageHr.styled";
import H2 from "../components/texts/H2.styled";
import { LanguageContext } from "../contexts/language-context";
import Navbar from "../navbar/Main.navbar";

const HomePage = (props) => {
  const { user, attemptLogout, deleteAccount } = props;
  const {
    stats: {
      globalProgress: { globalPercentage },
    },
    stats,
  } = user;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const {
    colors: { green, grey },
  } = theme;

  // TODO: remove double AppContainer
  return (
    <AppContainer withNavbar>
      <Navbar />
      <ScrollToTopOnMount />
      {globalPercentage ? (
        <GlobalProgress stats={stats} />
      ) : (
        <H2>{language.home.noStats}</H2>
      )}
      <NavigationLink to="/curriculum">
        <ButtonContainer large margin="80px auto 0 auto">
          <MainButton color={green} type="button">
            {language.home.resumeLearning}
          </MainButton>
        </ButtonContainer>
      </NavigationLink>
      <PageHr />
      <VerticalFlexbox margin="30px auto 50px auto">
        <ButtonContainer large>
          <MainButton onClick={attemptLogout} color={grey} type="button">
            {language.navigation.logout}
          </MainButton>
        </ButtonContainer>
        <ButtonContainer large margin="10px auto 0 auto">
          <MainButton onClick={deleteAccount} color={grey} type="button">
            {language.home.deleteAccount}
          </MainButton>
        </ButtonContainer>
      </VerticalFlexbox>
    </AppContainer>
  );
};

export default HomePage;
