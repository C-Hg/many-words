import React from "react";

import WordsToRememberStyled from "./WordsToRemember.styled";

import P from "../../components/texts/P.styled";

type Props = {
  failedWords: string[][];
};

const WordsToRemember = (props: Props) => {
  const { failedWords } = props;
  const words = failedWords.map((val) => {
    return (
      <P textAlign="left" margin="0" key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </P>
    );
  });
  return <WordsToRememberStyled>{words}</WordsToRememberStyled>;
};

export default WordsToRemember;
