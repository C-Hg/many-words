import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import GlobalProgress from "./progress/GlobalProgress.component";
import CurriculumTitle from "./styled/CurriculumTitle.styled";

import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import ButtonContainer from "../components/buttons/ButtonContainer.styled";
import MainButton from "../components/buttons/MainButton.styled";
// import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import NavigationLink from "../components/links/NavigationLink.styled";
import PageHr from "../components/separators/PageHr.styled";
import { LanguageContext } from "../contexts/language-context";
import { useGetCurriculumStatsQuery } from "../graphql/types";

const HomePage = () => {
  const { data } = useGetCurriculumStatsQuery({ fetchPolicy: "network-only" });
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const {
    colors: { green },
  } = theme;

  if (!data) {
    // TODO: loading animation
    return null;
  }

  const {
    curriculum: { stats },
  } = data;

  return (
    <>
      <ScrollToTopOnMount />
      <CurriculumTitle>{language.home.frenchEnglishVocabulary}</CurriculumTitle>
      <GlobalProgress stats={stats} />
      <NavigationLink to="/learn">
        <ButtonContainer large margin="80px auto 0 auto">
          <MainButton color={green} type="button">
            {language.home.resumeLearning}
          </MainButton>
        </ButtonContainer>
      </NavigationLink>
      <PageHr />
      {/* <VerticalFlexbox margin="30px auto 50px auto">
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
      </VerticalFlexbox> */}
    </>
  );
};

export default HomePage;
