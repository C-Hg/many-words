import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

const mapStateToProps = state => ({ exercise: state.exercise });

const mapDispatchToProps = dispatch => ({
  getWeakWords: reference => {
    dispatch(exerciseActions.getWeakWords(reference));
  },
});

const WeakWords = props => {
  const { exercise, reference, getWeakWords } = props;
  if (exercise.isWeakWordsMode) {
    return <Redirect to="/weak_words" />;
  }
  return (
    <LanguageContext.Consumer>
      {({ navigation }) => (
        <button
          onClick={() => getWeakWords(reference)}
          className="weak_words_button"
          type="button"
        >
          {navigation.weak_words}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

WeakWords.propTypes = {
  exercise: PropTypes.shape({
    isWeakWordsMode: PropTypes.bool.isRequired,
  }).isRequired,
  reference: PropTypes.string.isRequired,
  getWeakWords: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeakWords);
