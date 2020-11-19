import React from "react";

import VerticalFlexbox from "../../components/div/VerticalFlexbox.styled";
import P from "../../components/texts/P.styled";

const WordsToRemember = (props) => {
  const { exercise } = props;
  const words = exercise.failedWords.map((val) => {
    return (
      <P textAlign="left" margin="0" key={`${val[0]}`}>
        {val[0]} : {val[1]}
      </P>
    );
  });
  return (
    <VerticalFlexbox width="70%" margin="0 0 30px">
      {words}
    </VerticalFlexbox>
  );
};

export default WordsToRemember;
