import PropTypes from "prop-types";
import React, { useEffect, useContext } from "react";
import { connect } from "react-redux";
import { ThemeContext } from "styled-components";

import Switches from "./Switches.component";

import AppContainer from "../app/AppContainer.styled";
import GoBack from "../components/buttons/GoBack/GoBack.component";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";
import H2 from "../components/texts/H2.styled";
import P from "../components/texts/P.styled";
import { LanguageContext } from "../contexts/language-context";
import Navbar from "../navbar/Main.navbar";
import { actions as learnActions } from "../redux/reducers/learn";

const mapStateToProps = (state) => ({ learn: state.learn });
const mapDispatchToProps = (dispatch) => {
  return {
    getWordsToLearn: (lesson) => {
      dispatch(learnActions.getWordsToLearn(lesson));
    },
  };
};

const Learning = (props) => {
  const { getWordsToLearn, match, learn } = props;
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const { lessonId, themeId } = match.params;

  useEffect(() => {
    getWordsToLearn(match.params.lessonId);
  }, [getWordsToLearn, match.params.lessonId]);

  let wordsToLearn;
  // cannot do it if data is not fetched from the database
  if (learn.formattedWords) {
    wordsToLearn = learn.formattedWords.map((val) => {
      return (
        <P
          textAlign="left"
          width="auto"
          margin="0 0 10px"
          key={`twoWords${val.en}`}
        >
          {val.en} : {val.fr}
        </P>
      );
    });
  }
  return (
    <AppContainer sand withNavbar>
      <Navbar />
      <VerticalFlexbox sand width="auto">
        <GoBack to={`/${themeId}`} />
        <H2 margin="30px 0 30px 0" fontFamily={theme.fonts.cursive}>
          {language.lessons[themeId][lessonId]}
        </H2>
        <VerticalFlexbox sand margin="0 0 50px 0">
          {wordsToLearn}
        </VerticalFlexbox>
        <Switches />
      </VerticalFlexbox>
    </AppContainer>
  );
};

Learning.propTypes = {
  getWordsToLearn: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      lessonId: PropTypes.string.isRequired,
      themeId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  learn: PropTypes.shape({
    formattedWords: PropTypes.array,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Learning);
