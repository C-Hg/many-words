import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";

const mapStateToProps = state => ({ auth: state.auth });

const mapDispatchToProps = dispatch => ({
  acknowledgeAction: () => {
    dispatch(authActions.acknowledgeAction());
  },
});

const LogoutConfirmation = props => {
  const { auth, acknowledgeAction } = props;
  if (auth.hasProcedureSucceeded) {
    return (
      <LanguageContext.Consumer>
        {({ home }) => (
          <div className="logoutInfo">
            <h3 className="logoutText">{home.logout_success}</h3>
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
          <h3 className="logoutText">{home.logout_progress}</h3>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

LogoutConfirmation.propTypes = {
  auth: {
    hasProcedureSucceeded: PropTypes.bool.isRequired,
  }.isRequired,
  acknowledgeAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutConfirmation);
