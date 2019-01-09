import React from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { getSubthemesNames } from "../controllers/getSubthemesNames.function";

class Theme extends React.Component {
  render() {
    let theme = this.props.theme;
    let subthemesNames = getSubthemesNames(theme);
    let language = this.context;
    const subthemes = subthemesNames.map(val => (
      <Link to={`${this.props.match.url}/${val}`} key={val}>
        {language.subthemes[val]}
      </Link>
    ));

    return (
      <div>
        <h1>{language.themes[theme]}</h1>
        {subthemes}
      </div>
    );
  }
}

Theme.contextType = LanguageContext;

export default Theme;
