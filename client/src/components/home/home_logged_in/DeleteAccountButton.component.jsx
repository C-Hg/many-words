import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";

const mapDispatchToProps = dispatch => ({
  deleteAccount: () => {
    dispatch(authActions.beginAccountDeletion());
  },
});

const DeleteAccountButton = props => {
  const { deleteAccount } = props;

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <button
          className="deleteAccountButton homeFooterButton"
          onClick={deleteAccount}
          type="button"
        >
          {home.delete_account}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

DeleteAccountButton.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(DeleteAccountButton);
