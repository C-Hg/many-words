import React from "react";
import Result from "./Result.component";
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

    return (
      <div className={`exercise-footer ${footerClass}`}>
        <div className={`footer-content`}>
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

export default ExerciseFooter;
