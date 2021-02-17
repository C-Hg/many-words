import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { CheckBoxOutlineBlank, CheckBox } from "styled-icons/material";

import SocialLinks from "./SocialLinks.component";
import Li from "./upcoming/Li.styled";
import Span from "./upcoming/Span.styled";
import Ul from "./upcoming/Ul.styled";
import UpcomingContainer from "./upcoming/UpcomingContainer.styled";

import ScrollToTopOnMount from "../app/ScrollToTopOnMount.component";
import PageHr from "../components/separators/PageHr.styled";
import H1 from "../components/texts/H1.styled";
import H2 from "../components/texts/H2.styled";
import P from "../components/texts/P.styled";
import { LanguageContext } from "../contexts/language-context";

const boxSize = "24";

const About = () => {
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);
  const {
    about: {
      title,
      description,
      roadmap,
      roadmapShortTerm,
      roadmapLongTerm,
      shortTerm1,
      shortTerm2,
      shortTerm3,
      shortTerm4,
      shortTerm5,
      shortTerm6,
      longTerm1,
      longTerm2,
      longTerm3,
      longTerm4,
    },
  } = language;

  // Loops were not used to "check" features easily

  return (
    <>
      <ScrollToTopOnMount />
      <H1 margin="30px auto 40px auto">{title}</H1>
      <P textAlign="justify">{description}</P>
      <SocialLinks />
      <PageHr />
      <UpcomingContainer>
        <H1>{roadmap}</H1>
        <H2 textAlign="left" margin="30px 0 20px 50px">
          {roadmapShortTerm}
        </H2>
        <Ul>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{shortTerm1}</Span>
          </Li>
          <Li>
            <CheckBox alt="done" color={theme.colors.green} size={boxSize} />
            <Span>{shortTerm2}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{shortTerm3}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{shortTerm4}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{shortTerm5}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{shortTerm6}</Span>
          </Li>
        </Ul>
        <H2 textAlign="left" margin="30px 0 20px 50px">
          {roadmapLongTerm}
        </H2>
        <Ul>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{longTerm1}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{longTerm2}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{longTerm3}</Span>
          </Li>
          <Li>
            <CheckBoxOutlineBlank
              alt="to do"
              color={theme.colors.grey}
              size={boxSize}
            />
            <Span>{longTerm4}</Span>
          </Li>
        </Ul>
      </UpcomingContainer>
    </>
  );
};

export default About;
