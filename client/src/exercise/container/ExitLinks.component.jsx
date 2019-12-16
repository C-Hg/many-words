import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../exercise.reducer";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  getWords: (lesson, theme) => {
    dispatch(exerciseActions.getWords(lesson, theme));
  },
  continueWeakWords: () => {
    dispatch(exerciseActions.continueWeakWords());
  },
  quitExercise: () => {
    dispatch(exerciseActions.quitExercise());
  },
});

const ExitLinks = props => {
  const { continueWeakWords, getWords, quitExercise, exercise } = props;
  const { isWeakWordsMode, words } = exercise;
  // gets the lesson and theme of the first word of the current batch
  // this works only for classical lessons
  const { lesson, theme } = words[0];

  const restartLesson = () => {
    if (exercise.isWeakWordsMode) {
      continueWeakWords();
    } else {
      getWords(lesson, theme);
    }
  };

  return (
    <LanguageContext.Consumer>
      {({ navigation }) => (
        <div className="links">
          <button className="exitLink" onClick={restartLesson} type="button">
            {isWeakWordsMode ? navigation.to_continue : navigation.try_again}
          </button>
          <button className="exitLink" onClick={quitExercise} type="button">
            {navigation.quit}
          </button>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

ExitLinks.propTypes = {
  exercise: PropTypes.shape({
    isWeakWordsMode: PropTypes.bool.isRequired,
    words: PropTypes.array.isRequired,
  }).isRequired,
  continueWeakWords: PropTypes.func.isRequired,
  getWords: PropTypes.func.isRequired,
  quitExercise: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExitLinks);
