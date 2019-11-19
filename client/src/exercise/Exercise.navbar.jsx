import React, { useContext } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import H1 from "../components/texts/H1.styled";
import { LanguageContext } from "../contexts/language-context";
import theme from "../app/theme";
import Navbar from "../navbar/Navbar.styled";

const mapStateToProps = state => ({ exercise: state.exercise });

const ExerciseNavbar = props => {
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
      <H1 color={theme.colors.white} font={theme.fonts.cursive}>
        {title}
      </H1>
    </Navbar>
  );
};

ExerciseNavbar.propTypes = {
  exercise: PropTypes.shape({
    status: PropTypes.string.isRequired,
    isWeakWordsMode: PropTypes.bool.isRequired,
    words: PropTypes.array.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(ExerciseNavbar);
