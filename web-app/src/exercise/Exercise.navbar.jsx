import React, { useContext } from "react";

import Quit from "./Quit/Quit.component";

import theme from "../app/theme";
import H2 from "../components/texts/H2.styled";
import { LanguageContext } from "../contexts/language-context";
import Navbar from "../navbar/Navbar.styled";

const ExerciseNavbar = (props) => {
  const language = useContext(LanguageContext);
  const { exercise } = props;
  const { words, isWeakWordsMode, status } = exercise;
  const { lesson } = words[0];

  const title =
    status === "recap" && isWeakWordsMode
      ? language.revision
      : language.lessons[words[0].theme][lesson];

  return (
    <Navbar>
      <Quit />
      <H2 color={theme.colors.white} fontFamily={theme.fonts.cursive}>
        {title}
      </H2>
    </Navbar>
  );
};

export default ExerciseNavbar;
