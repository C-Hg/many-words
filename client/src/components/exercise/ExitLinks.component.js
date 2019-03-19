import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    restartExercise: () => {
      dispatch(exerciseActions.restartExercise());
    }
  };
};

class ExitLinks extends React.Component {
  render() {
    let user = this.props.user;
    return (
      <LanguageContext.Consumer>
        {({ navigation }) => (
          <div className="links">
            <button className="exitLink" onClick={this.props.restartExercise}>
              {user.activity === "weak_words"
                ? navigation.to_continue
                : navigation.try_again}
            </button>
            <button className="exitLink" onClick={this.props.redirect}>
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
