import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWords: lesson => {
      dispatch(exerciseActions.getWords(lesson));
    },
    continueWeakWords: () => {
      dispatch(exerciseActions.continueWeakWords());
    },
    quitExercise: () => {
      dispatch(exerciseActions.quitExercise());
    }
  };
};

class ExitLinks extends React.Component {
  constructor(props) {
    super(props);
    this.restartLesson = this.restartLesson.bind(this);
  }

  restartLesson() {
    const lesson = this.props.exercise.words[0].lesson;
    const theme = this.props.exercise.words[0].theme;
    if (this.props.exercise.weakWordsMode) {
      this.props.continueWeakWords();
    } else {
      this.props.getWords(lesson, theme);
    }
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {({ navigation }) => (
          <div className="links">
            <button className="exitLink" onClick={this.restartLesson}>
              {this.props.exercise.weakWordsMode
                ? navigation.to_continue
                : navigation.try_again}
            </button>
            <button className="exitLink" onClick={this.props.quitExercise}>
              {navigation.quit}
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExitLinks);
