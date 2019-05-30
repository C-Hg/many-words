import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    deleteAccount: () => {
      dispatch(authActions.beginAccountDeletion());
    }
  };
};

function DeleteAccountButton(props) {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <button
          className="deleteAccountButton homeFooterButton"
          onClick={props.deleteAccount}
        >
          {home.delete_account}
        </button>
      )}
    </LanguageContext.Consumer>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteAccountButton);
