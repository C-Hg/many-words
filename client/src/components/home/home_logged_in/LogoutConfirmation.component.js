import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as userActions } from "../../../redux/reducers/user";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    attemptLogout: () => {
      dispatch(userActions.attemptLogout());
    }
  };
};

// ADD action to reset login independently from other user stats to allow confirmation step
function LogoutConfirmation(props) {
  let user = this.props.user.login;
  if (user.hasProcedureSuceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_success}</h3>
            <button onClick={props.continue} className="acknowledgeLogout ok">
              OK
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  } else {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_progress}</h3>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutConfirmation);
