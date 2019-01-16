import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class Logout extends React.Component {
  render() {
    let language = this.context;
    let languageClass;
    if (language.language === "english") {
      languageClass = "logout-button-english";
    } else {
      languageClass = "logout-button-french";
    }
    return (
      <button
        onClick={this.props.logout}
        className={`logoutButton ${languageClass}`}
      >
        {language.navigation.logout}
      </button>
    );
  }
}

export default Logout;

Logout.contextType = LanguageContext;
