import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { Twitter, Github } from "styled-icons/fa-brands";

import HorizontalFlexbox from "../components/div/HorizontalFlexbox.styled";
import ScalingLink from "../components/links/ScalingLink.styled";

const iconSize = 48;

const SocialLinks = () => {
  const theme = useContext(ThemeContext);
  return (
    <HorizontalFlexbox
      width="160px"
      height="60px"
      justifyContent="space-between"
    >
      <ScalingLink
        href="https://github.com/C-Hg/many-words"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Github size={iconSize} color={theme.colors.githubGrey} />
      </ScalingLink>
      <ScalingLink
        href="https://twitter.com/CamilleHg"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Twitter size={iconSize} color={theme.colors.twitterBlue} />
      </ScalingLink>
    </HorizontalFlexbox>
  );
};

export default SocialLinks;
