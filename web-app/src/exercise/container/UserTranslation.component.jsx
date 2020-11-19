import React, { useRef, useEffect } from "react";

import InnerContainer from "./styled/InnerContainer.styled";
import UserTextInput from "./styled/UserTextInput.styled";

import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import CONSTANTS from "../../config/constants";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";

const UserTranslation = (props) => {
  const translationInput = useRef();

  const {
    exercise,
    nextWord,
    submitUserTranslation,
    updateUserTranslation,
  } = props;
  const { userTranslation, isChecking, words, wordRank } = exercise;
  const language = words[wordRank].selectedForm[1];
  const flag = language === "fr" ? ukFlag : frenchFlag;
  const { width: screenWidth } = useWindowDimensions();

  // this makes the focus facultative to answer on desktop
  const handleKeyDown = (event) => {
    event.preventDefault();
    // Enter key
    if (event.key === "Enter") {
      if (exercise.isChecking) {
        nextWord();
      } else {
        submitUserTranslation();
      }
    } else if (!exercise.isChecking) {
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

  const userTranslationChange = (event) => {
    // special characters are not allowed for security reasons
    const specialCharacters = /[.?/\\_+,;:!*()[\]{}~&%$]+/i;
    const isCharacterAllowed = !specialCharacters.test(event.target.value);
    if (isCharacterAllowed) {
      updateUserTranslation(event.target.value);
    }
  };

  return (
    <InnerContainer screenWidth={screenWidth} sand>
      <FlagContainer alignSelf="flex-start" marginTop="6px" marginRight="25px">
        <Flag src={flag} alt="flag" />
      </FlagContainer>
      <UserTextInput
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        value={userTranslation}
        onChange={userTranslationChange}
        ref={translationInput}
        readOnly={isChecking}
      />
    </InnerContainer>
  );
};

export default UserTranslation;