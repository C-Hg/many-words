import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

class Logout extends React.Component {
  render() {
    let language = this.context;

    return (
      <button
        onClick={this.props.logout}
        className={`logoutButton homeFooterButton`}
      >
        {language.navigation.logout}
      </button>
    );
  }
}

export default Logout;

Logout.contextType = LanguageContext;
