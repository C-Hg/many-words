import { useQuery } from "@apollo/client";
import React, { useRef, useEffect, ChangeEvent } from "react";

import InnerContainer from "./styled/InnerContainer.styled";
import UserTextInput from "./styled/UserTextInput.styled";

import { userTranslationVar } from "../../cache";
import FlagContainer from "../../components/div/FlagContainer.styled";
import Flag from "../../components/images/Flag.styled";
import { LANGUAGES } from "../../config/constants";
import frenchFlag from "../../images/flags/France.png";
import ukFlag from "../../images/flags/UK.png";
import {
  continueWithNextWord,
  submitUserTranslation,
} from "../Exercise.controller";
import { GET_EXERCISE_DETAILS } from "../graphql/getExerciseDetails.graphql.local";
import { GET_USER_TRANSLATION } from "../graphql/getUserTranslation.graphql.local";

type Props = {
  isLastWord: boolean;
  sourceLanguage: LANGUAGES;
};

const UserTranslation = (props: Props) => {
  const translationInput = useRef<HTMLTextAreaElement>(null);

  const {
    data: { isCheckingAnswer },
  } = useQuery(GET_EXERCISE_DETAILS);
  const {
    data: { userTranslation },
  } = useQuery(GET_USER_TRANSLATION);

  const { isLastWord, sourceLanguage } = props;
  const flag = sourceLanguage === LANGUAGES.French ? ukFlag : frenchFlag;

  // this makes the focus facultative to answer on desktop
  const handleKeyDown = (event: KeyboardEvent) => {
    // event.preventDefault();
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
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const userTranslationChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    userTranslationVar(event.currentTarget.value);
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
