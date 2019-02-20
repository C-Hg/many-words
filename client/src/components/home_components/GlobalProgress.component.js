import React from "react";
import { LanguageContext } from "../../contexts/language-context";
import ProgressBar from "./ProgressBar.component";

function GlobalProgress(props) {
  let progress = props.userStats.globalProgress.globalPercentage;

  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <div className="globalProgress">
          <h1 className="menuTitle">{home.progress_title}</h1>
          <ProgressBar progress={progress} />
        </div>
      )}
    </LanguageContext.Consumer>
  );
}

export default GlobalProgress;
