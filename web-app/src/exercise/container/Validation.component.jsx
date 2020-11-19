import React, { useContext } from "react";
import { ThemeContext } from "styled-components";

import ContinueButton from "./ContinueButton.component";
import ValidationContainer from "./styled/ValidationContainer.styled";
import ValidationText from "./styled/ValidationText.styled";

import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import { LanguageContext } from "../../contexts/language-context";

const Validation = (props) => {
  const { exercise, submitUserTranslation, nextWord } = props;
  const { isChecking, isAnswerCorrect, expectedAnswer } = exercise;
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const { correct } = language;
  const { white, lightGreen, paleRed, sand, darkBlue } = theme.colors;

  const randomCongrats = Math.floor(Math.random() * 17);
  let color;
  if (!isChecking) {
    color = sand;
  } else {
    color = isAnswerCorrect ? lightGreen : paleRed;
  }
  const onClick = isChecking ? nextWord : submitUserTranslation;
  const arrowColor = isChecking ? white : darkBlue;
  // TODO: better management of margin-bottom under validationContainer
  return (
    <ValidationContainer backgroundColor={color} isChecking={isChecking}>
      <HorizontalFlexbox
        height="100%"
        backgroundColor="transparent"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        {isChecking &&
          (isAnswerCorrect ? (
            <ValidationText fontWeight="600" left="40px">
              {correct[randomCongrats]}
            </ValidationText>
          ) : (
            <VerticalFlexbox
              alignSelf="flex-start"
              height="80%"
              backgroundColor="transparent"
              alignItems="flex-start"
              justifyContent="space-evenly"
            >
              <ValidationText fontWeight="600">
                {`${language.correctAnswer} :`}
              </ValidationText>
              <ValidationText
                paddingLeft="10px"
                fontSize="16px"
              >{`${expectedAnswer}`}</ValidationText>
            </VerticalFlexbox>
          ))}
        <ContinueButton onClick={onClick} arrowColor={arrowColor} />
      </HorizontalFlexbox>
    </ValidationContainer>
  );
};

export default Validation;
