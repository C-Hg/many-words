import React from "react";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import ExitLinks from "./ExitLinks.component";

class ExerciseRecap extends React.Component {
  render() {
    return (
      <div className="exerciseRecap">
        <LessonResult failedWords={this.props.failedWords} />
        {this.props.failedWords.length > 0 && (
          <WordsToRemember failedWords={this.props.failedWords} />
        )}
        <ExitLinks
          lesson={this.props.lesson}
          theme={this.props.theme}
          redirect={this.props.redirect}
        />
      </div>
    );
  }
}

export default ExerciseRecap;
