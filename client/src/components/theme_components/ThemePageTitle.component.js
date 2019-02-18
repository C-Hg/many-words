import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class ThemePageTitle extends React.Component {
  render() {
    let language = this.context;
    return <h1 className="menuTitle">{language.themes[this.props.theme]}</h1>;
  }
}

export default ThemePageTitle;

ThemePageTitle.contextType = LanguageContext;
