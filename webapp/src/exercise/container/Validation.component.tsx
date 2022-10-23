import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ContinueButton from "./ContinueButton.component";
import ValidationContainer from "./styled/ValidationContainer.styled";
import ValidationText from "./styled/ValidationText.styled";

import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import { LanguageContext } from "../../contexts/language-context";
import {
  continueWithNextWord,
  submitUserTranslation,
} from "../Exercise.controller";
import { GET_EXERCISE_DETAILS } from "../graphql/getExerciseDetails.graphql.local";

type Props = {
  answer: string;
};

const Validation = (props: Props) => {
  const { answer } = props;
  const {
    data: { isAnswerCorrect, isCheckingAnswer },
  } = useQuery(GET_EXERCISE_DETAILS);
  const { correct, correctAnswer } = useContext(LanguageContext);
  const {
    colors: { white, lightGreen, paleRed, sand, darkBlue },
  } = useContext(ThemeContext);

  let color;
  if (!isCheckingAnswer) {
    color = sand;
  } else {
    color = isAnswerCorrect ? lightGreen : paleRed;
  }
  const onClick = isCheckingAnswer
    ? continueWithNextWord
    : submitUserTranslation;
  const arrowColor = isCheckingAnswer ? white : darkBlue;

  // TODO: random list by exercise and use the word rank
  const randomCongrats = Math.floor(Math.random() * 17);
  // TODO: better management of margin-bottom under validationContainer
  return (
    <ValidationContainer backgroundColor={color} isChecking={isCheckingAnswer}>
      <HorizontalFlexbox
        height="100%"
        backgroundColor="transparent"
        justifyContent="flex-start"
      >
        {isCheckingAnswer &&
          (isAnswerCorrect ? (
            <ValidationText>{correct[randomCongrats]}</ValidationText>
          ) : (
            <VerticalFlexbox
              alignSelf="flex-start"
              height="80%"
              alignItems="flex-start"
              justifyContent="space-evenly"
            >
              <ValidationText fontWeight="600">
                {`${correctAnswer} :`}
              </ValidationText>
              <ValidationText
                paddingLeft="10px"
                fontSize="16px"
              >{`${answer}`}</ValidationText>
            </VerticalFlexbox>
          ))}
        <ContinueButton onClick={onClick} arrowColor={arrowColor} />
      </HorizontalFlexbox>
    </ValidationContainer>
  );
};

export default Validation;
