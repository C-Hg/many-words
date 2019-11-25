import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Switches from "../components/learning/Switches.component";
import LearningTitle from "../components/learning/LearningTitle.component";
import { actions as learnActions } from "../redux/reducers/learn";
import "../styles/Learning.scss";
import Navbar from "../navbar/Main.navbar";

const mapStateToProps = state => ({ learn: state.learn });
const mapDispatchToProps = dispatch => {
  return {
    getWordsToLearn: lesson => {
      dispatch(learnActions.getWordsToLearn(lesson));
    },
  };
};

const Learning = props => {
  const { getWordsToLearn, match, learn } = props;
  const { lessonId, themeId } = match.params;

  useEffect(() => {
    getWordsToLearn(match.params.lessonId);
  }, [getWordsToLearn, match.params.lessonId]);

  let wordsToLearn;
  // cannot do it if data is not fetched from the database
  if (learn.formattedWords) {
    wordsToLearn = learn.formattedWords.map(val => {
      return (
        <div key={`twoWords${val.en}`} className="twoWords">
          {val.en} : {val.fr}
        </div>
      );
    });
  }
  return (
    <div className="app app-with-navbar-full-screen">
      <Navbar />
      <div className="main-container whiteBackground">
        <div className="learning-container">
          <Link to={`/${themeId}`} className="arrowLink">
            {/* <BackArrow /> */}
          </Link>
          <LearningTitle lesson={lessonId} theme={themeId} />
          <div className="wordsToLearn">{wordsToLearn}</div>
          <Switches />
        </div>
      </div>
    </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Learning);
