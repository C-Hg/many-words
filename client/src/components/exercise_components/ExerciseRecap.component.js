import React from "react";

import LessonResult from "./LessonResult.component";
import WordsToRemember from "./WordsToRemember.component";
import ExitLinks from "./ExitLinks.component";
import { UserContext } from "../../contexts/user-context";
import updateWordStats from "../../controllers/progress_tracking/updateWordStats.function";

class ExerciseRecap extends React.Component {
  render() {
    let user = this.context;
    if (user.isAuthenticated) {
      updateWordStats(this.props.result);
    }
    return (
      <div className="exerciseRecap">
        <LessonResult failedWords={this.props.failedWords} />
        {this.props.failedWords.length > 0 && (
          <WordsToRemember failedWords={this.props.failedWords} />
        )}
        <ExitLinks
          restart={this.props.restart}
          lesson={this.props.lesson}
          theme={this.props.theme}
          redirect={this.props.redirect}
        />
      </div>
    );
  }
}

export default ExerciseRecap;

ExerciseRecap.contextType = UserContext;
