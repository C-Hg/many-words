import { useQuery } from "@apollo/client";
import React, { useRef, useEffect, ChangeEvent } from "react";

import InnerContainer from "./styled/InnerContainer.styled";
import UserTextInput from "./styled/UserTextInput.styled";

import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import CONSTANTS, { LANGUAGES } from "../../config/constants";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";
import { continueWithNextWord } from "../Exercise.functions";
import { GET_EXERCISE_DETAILS } from "../graphql/getExerciseDetails.graphql.local";

type Props = {
  isLastWord: boolean;
  sourceLanguage: LANGUAGES;
};

const UserTranslation = (props: Props) => {
  const translationInput = useRef<HTMLTextAreaElement>(null);

  const {
    data: { isCheckingAnswer, userTranslation },
  } = useQuery(GET_EXERCISE_DETAILS);

  const { isLastWord, sourceLanguage } = props;
  const flag = sourceLanguage === LANGUAGES.French ? ukFlag : frenchFlag;

  // this makes the focus facultative to answer on desktop
  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    // Enter key
    if (event.key === "Enter") {
      if (isCheckingAnswer) {
        if (isLastWord) {
          // TODO: send stats and prepare recap
        } else {
          continueWithNextWord();
        }
      } else {
        submitUserTranslation();
      }
    } else if (!isCheckingAnswer) {
      // White space
      if (/\s/.test(event.key)) {
        updateUserTranslation(`${userTranslation} `);
      }
      // Backspace
      else if (event.key === "Backspace" && userTranslation.length > 0) {
        updateUserTranslation(userTranslation.slice(0, -1));
      }
      // all allowed letters
      else if (CONSTANTS.allowedCharacters.test(event.key)) {
        updateUserTranslation(userTranslation + event.key);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const userTranslationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    // special characters are not allowed for security reasons
    const specialCharacters = /[.?/\\_+,;:!*()[\]{}~&%$]+/i;
    const isCharacterAllowed = !specialCharacters.test(
      event.currentTarget.value
    );
    if (isCharacterAllowed) {
      updateUserTranslation(event.currentTarget.value);
    }
  };

  return (
    <InnerContainer sand>
      <FlagContainer marginTop="6px" marginRight="25px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <UserTextInput
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        onChange={userTranslationChange}
        readOnly={isCheckingAnswer}
        ref={translationInput}
        spellCheck="false"
        value={userTranslation}
      />
    </InnerContainer>
  );
};

export default UserTranslation;