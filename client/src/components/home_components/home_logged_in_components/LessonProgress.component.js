import React from "react";
import { LanguageContext } from "../../../contexts/language-context";

function LessonProgress(props) {
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="wordStats">
          <h1 className="progressTitle">{home.lessons}</h1>
          <hr className="progressSeparation" />
          <div className="userStats">
            <div className="iconAndStat">
              <i alt="seen" className="material-icons md-48 seenIcon">
                search
              </i>
              <div className="userStat">{props.lessonStats.studiedLessons}</div>
            </div>
            <div className="iconAndStat">
              <i alt="green" className="material-icons md-48 greenIcon">
                check_circle_outline
              </i>
              <div className="userStat">{props.lessonStats.greenLessons}</div>
            </div>
            <div className="iconAndStat">
              <i alt="gold" className="material-icons md-48 goldIcon">
                grade
              </i>
              <div className="userStat">{props.lessonStats.goldLessons}</div>
            </div>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default LessonProgress;
