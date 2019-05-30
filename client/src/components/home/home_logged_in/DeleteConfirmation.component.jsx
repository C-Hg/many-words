import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { auth: state.auth };
}

const mapDispatchToProps = dispatch => {
  return {
    confirmDeletion: () => {
      dispatch(authActions.confirmDeletion());
    },
    abortDeletion: () => {
      dispatch(authActions.abortDeletion());
    },
    acknowledgeAction: () => {
      dispatch(authActions.acknowledgeAction());
    }
  };
};

function DeleteConfirmation(props) {
  if (!props.auth.hasConfirmedDeletion) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.confirm_deletion}</h3>
            <div className="deleteButtons">
              <button
                onClick={props.confirmDeletion}
                className="acknowledgeLogout confirm"
              >
                {home.confirm}
              </button>
              <button
                onClick={props.abortDeletion}
                className="acknowledgeLogout abort"
              >
                {home.back}
              </button>
            </div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  } else {
    if (props.auth.hasProcedureSucceeded) {
      return (
        <LanguageContext.Consumer>
          {({ home }) => (
            <div className="logoutInfo">
              <h3 className="logoutText">{home.delete_success}</h3>
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
              <h3 className="logoutText">{home.delete_waiting}</h3>
            </div>
          )}
        </LanguageContext.Consumer>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteConfirmation);
