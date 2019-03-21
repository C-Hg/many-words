import React from "react";

import Instructions from "./Instructions.component";
import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SubmitOrNextButton from "./SubmitOrNextButton.component";
import SpecialCharacters from "./SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";

class ExerciseContainer extends React.Component {
  render() {
    let languageClass = "";
    const language = this.context;
    if (language.language === "french") {
      languageClass = "exercise_container_french";
    } else {
      languageClass = "exercise_container_english";
    }
    return (
      <div className={"exercise_container " + languageClass}>
        <Instructions />
        <OriginWord />
        <UserTranslation />
        {language.language === "english" && <SpecialCharacters />}
        <SubmitOrNextButton />
      </div>
    );
  }
}

ExerciseContainer.contextType = LanguageContext;

export default ExerciseContainer;
