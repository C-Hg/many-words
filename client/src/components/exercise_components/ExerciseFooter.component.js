import React from "react";
import Result from "./Result.component";
import { LanguageContext } from "../../contexts/language-context";

class ExerciseFooter extends React.Component {
  render() {
    let footerClass = "";
    if (this.props.checking) {
      if (this.props.correctAnswer) {
        footerClass = "exercise-footer-correct";
      } else {
        footerClass = "exercise-footer-incorrect";
      }
    }
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
          <Result
            checking={this.props.checking}
            correctAnswer={this.props.correctAnswer}
            expectedAnswer={this.props.expectedAnswer}
          />
        </div>
      </div>
    );
  }
}

ExerciseFooter.contextType = LanguageContext;

export default ExerciseFooter;
