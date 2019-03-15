import React from "react";
import { LanguageContext } from "../../../contexts/language-context";
import { actions as authActions } from "../../../redux/reducers/auth";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    attemptLogout: () => {
      dispatch(authActions.attemptLogout());
    }
  };
};

class LogoutButton extends React.Component {
  render() {
    let language = this.context;

    return (
      <button
        onClick={this.props.attemptLogout}
        className={`logoutButton homeFooterButton`}
      >
        {language.navigation.logout}
      </button>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);

LogoutButton.contextType = LanguageContext;
