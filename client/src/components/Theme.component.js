import React from "react";
import { LanguageContext } from "../contexts/language-context";

class Theme extends React.Component {
  render() {
    let language = this.context;
    const subthemes = this.props.subthemes.map(val => (
      <button onClick={this.props.seeSubtheme} name={val} key={val}>
        {language.subthemes[val]}
      </button>
    ));
    return (
      <div>
        <h1>{language.themes[this.props.theme]}</h1>
        {subthemes}
      </div>
    );
  }
}

Theme.contextType = LanguageContext;

export default Theme;
