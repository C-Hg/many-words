import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Link } from "react-router-dom";

class StartTestButton extends React.Component {
  render() {
    let language = this.context;
    return (
      <Link
        to={`${this.props.match.url}/${this.props.lesson}/test`}
        className="startTest"
      >
        <i alt="Start exercise" className="material-icons md-36">
          play_circle_outline
        </i>
        <p className="startButtonTitle">{language.start_exercise}</p>
      </Link>
    );
  }
}

export default StartTestButton;

StartTestButton.contextType = LanguageContext;
