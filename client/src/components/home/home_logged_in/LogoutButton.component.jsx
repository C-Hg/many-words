import React, { useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";

const mapDispatchToProps = dispatch => ({
  attemptLogout: () => {
    dispatch(authActions.attemptLogout());
  },
});

// TODO: create a standard button component
const LogoutButton = props => {
  const { attemptLogout } = props;
  const language = useContext(LanguageContext);

  return (
    <button
      onClick={attemptLogout}
      className="logoutButton homeFooterButton"
      type="button"
    >
      {language.navigation.logout}
    </button>
  );
};

LogoutButton.propTypes = {
  attemptLogout: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
