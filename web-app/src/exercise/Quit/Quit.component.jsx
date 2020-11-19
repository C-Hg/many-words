import React from "react";
import { Close } from "styled-icons/evil";

import IconButton from "../../components/buttons/IconButton.styled";

const Quit = (props) => {
  const { quitExercise } = props;

  return (
    <IconButton
      onClick={quitExercise}
      left="20px"
      className="QuitButton"
      type="button"
    >
      <Close alt="Quit" size="40" />
    </IconButton>
  );
};

export default Quit;
