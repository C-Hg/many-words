import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Redirect } from "react-router-dom";
import { actions as exerciseActions } from "../../redux/reducers/exercise";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWeakWords: reference => {
      dispatch(exerciseActions.getWeakWords(reference));
    }
  };
};

function WeakWords(props) {
  if (props.exercise.weakWordsMode) {
    return <Redirect to={`/weak_words`} />;
  } else
    return (
      <LanguageContext.Consumer>
        {({ navigation }) => (
          <button
            onClick={() => props.getWeakWords(props.reference)}
            className="weak_words_button"
          >
            {navigation.weak_words}
          </button>
        )}
      </LanguageContext.Consumer>
    );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeakWords);
