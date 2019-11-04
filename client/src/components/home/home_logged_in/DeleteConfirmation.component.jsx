import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  confirmDeletion: () => {
    dispatch(authActions.confirmDeletion());
  },
  abortDeletion: () => {
    dispatch(authActions.abortDeletion());
  },
  acknowledgeAction: () => {
    dispatch(authActions.acknowledgeAction());
  },
});

const DeleteConfirmation = props => {
  const { auth, confirmDeletion, abortDeletion, acknowledgeAction } = props;

  if (!auth.hasConfirmedDeletion) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.confirm_deletion}</h3>
            <div className="deleteButtons">
              <button
                onClick={confirmDeletion}
                className="acknowledgeLogout confirm"
                type="button"
              >
                {home.confirm}
              </button>
              <button
                onClick={abortDeletion}
                className="acknowledgeLogout abort"
                type="button"
              >
                {home.back}
              </button>
            </div>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
  if (auth.hasProcedureSucceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.delete_success}</h3>
            <button
              onClick={acknowledgeAction}
              className="acknowledgeLogout ok"
              type="button"
            >
              OK
            </button>
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="logoutInfo">
          <h3 className="logoutText">{home.delete_waiting}</h3>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

DeleteConfirmation.propTypes = {
  auth: {
    hasConfirmedDeletion: PropTypes.bool.isRequired,
    hasProcedureSucceeded: PropTypes.bool.isRequired,
  }.isRequired,
  confirmDeletion: PropTypes.func.isRequired,
  abortDeletion: PropTypes.func.isRequired,
  acknowledgeAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteConfirmation);
