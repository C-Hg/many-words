import React from "react";
import Result from "./Result.component";
import { LanguageContext } from "../../contexts/language-context";
import Score from "./Score.component";

class ExerciseFooter extends React.Component {
  render() {
    let footerClass = "";
    //only if the exercise is active
    if (this.props.checking) {
      if (this.props.correctAnswer) {
        footerClass = "exercise-footer-correct";
      } else {
        footerClass = "exercise-footer-incorrect";
      }
    }

    //only during recap
    if (this.props.status === "recap") {
      const successRatio =
        (this.props.wordRank + 1 - this.props.failedWords.length) /
        (this.props.wordRank + 1);
      if (successRatio > 0.8) {
        footerClass = "exercise-footer-correct";
      } else if (successRatio > 0.5) {
        footerClass = "exercise-footer-warning";
      } else {
        footerClass = "exercise-footer-incorrect";
      }
    }

    // TO BE DELETED IF TEXT STAYS CENTERED
    let languageClass = "";
    let language = this.context;
    if (language.language === "french") {
      languageClass = "footer-content-french";
    } else {
      languageClass = "footer-content-english";
    }

    return (
      <div className={`exercise-footer ${footerClass}`}>
        <div className={`footer-content ${languageClass}`}>
          {this.props.status === "exercise" && (
            <Result
              checking={this.props.checking}
              correctAnswer={this.props.correctAnswer}
              expectedAnswer={this.props.expectedAnswer}
            />
          )}
          {this.props.status === "recap" && (
            <Score
              wordRank={this.props.wordRank}
              failedWords={this.props.failedWords}
            />
          )}
        </div>
      </div>
    );
  }
}

ExerciseFooter.contextType = LanguageContext;

export default ExerciseFooter;
