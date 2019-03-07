import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class ThemeTitle extends React.Component {
  render() {
    let language = this.context;

    return (
      <div className="themeTitle">{language.themes[this.props.theme]}</div>
    );
  }
}

export default ThemeTitle;

ThemeTitle.contextType = LanguageContext;
