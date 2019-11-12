import React from "react";
import { withTheme } from "styled-components";
import { AllInclusive, Spellcheck, Stars } from "styled-icons/material";
import PropTypes from "prop-types";

import { LanguageContext } from "../../../contexts/language-context";
import StyledFeatures from "./Features.styled";
import StyledFeature from "./Feature.styled";

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
            <h2 className="features_title">{home.features_free}</h2>
          </StyledFeature>
          <StyledFeature>
            <Spellcheck title="check" size={iconSize} color={darkBlue} />
            <h2 className="features_title">{home.features_words}</h2>
          </StyledFeature>
          <StyledFeature>
            <Stars title="stars" size={iconSize} color={darkBlue} />
            <h2 className="features_title">{home.features_progress}</h2>
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
