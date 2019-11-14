import React from "react";
import { withTheme } from "styled-components";
import { AllInclusive, Spellcheck, Stars } from "styled-icons/material";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import StyledFeatures from "./Features.styled";
import StyledFeature from "./Feature.styled";
import H2 from "../../texts/H2.styled";

const Features = props => {
  const { theme } = props;
  const { darkBlue } = theme.colors;
  const iconSize = "72";
  return (
    <LanguageContext.Consumer>
      {({ home }) => (
        <StyledFeatures>
          <StyledFeature>
            <AllInclusive title="free" size={iconSize} color={darkBlue} />
            <H2>{home.features_free}</H2>
          </StyledFeature>
          <StyledFeature>
            <Spellcheck title="check" size={iconSize} color={darkBlue} />
            <H2>{home.features_words}</H2>
          </StyledFeature>
          <StyledFeature>
            <Stars title="stars" size={iconSize} color={darkBlue} />
            <H2>{home.features_progress}</H2>
          </StyledFeature>
        </StyledFeatures>
      )}
    </LanguageContext.Consumer>
  );
};

Features.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      darkBlue: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default withTheme(Features);
