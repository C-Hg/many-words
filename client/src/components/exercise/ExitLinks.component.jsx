import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWords: (lesson, theme) => {
      dispatch(exerciseActions.getWords(lesson, theme));
    },
    continueWeakWords: () => {
      dispatch(exerciseActions.continueWeakWords());
    },
    quitExercise: () => {
      dispatch(exerciseActions.quitExercise());
    }
  };
};

const ExitLinks = props => {
  const { continueWeakWords, getWords, quitExercise, exercise } = props;
  // gets the lesson and theme of the first word of the current batch
  // this works only for classical lessons
  const { lesson, theme } = exercise.words[0];

  const restartLesson = () => {
    if (exercise.weakWordsMode) {
      continueWeakWords();
    } else {
      getWords(lesson, theme);
    }
  };

  return (
    <LanguageContext.Consumer>
      {({ navigation }) => (
        <div className="links">
          <button className="exitLink" onClick={restartLesson}>
            {exercise.weakWordsMode
              ? navigation.to_continue
              : navigation.try_again}
          </button>
          <button className="exitLink" onClick={quitExercise}>
            {navigation.quit}
          </button>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExitLinks);
