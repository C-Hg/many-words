import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import { Link } from "react-router-dom";

class LearnWordsButton extends React.Component {
  render() {
    let language = this.context;
    return (
      <Link
        to={`${this.props.match.url}/${this.props.lesson}/learn`}
        className="startLearning"
      >
        <i alt="Learn words" className="material-icons md-36">
          add
        </i>
        <p className="startButtonTitle">{language.start_learning}</p>
      </Link>
    );
  }
}

export default LearnWordsButton;

LearnWordsButton.contextType = LanguageContext;
