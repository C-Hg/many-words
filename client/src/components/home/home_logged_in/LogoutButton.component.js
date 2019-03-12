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
  mapStateToProps,
  mapDispatchToProps
)(LogoutButton);

LogoutButton.contextType = LanguageContext;
