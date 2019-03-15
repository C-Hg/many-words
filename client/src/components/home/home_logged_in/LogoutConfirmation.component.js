import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => {
  return {
    acknowledgeAction: () => {
      dispatch(authActions.acknowledgeAction());
    }
  };
};

function LogoutConfirmation(props) {
  if (props.auth.hasProcedureSucceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_success}</h3>
            <button
              onClick={props.acknowledgeAction}
              className="acknowledgeLogout ok"
            >
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
