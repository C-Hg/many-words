import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const LandingTitle = styled.h1`
  font-weight: 600;
  font-family: ${props => props.theme.fonts.secondary};
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: ${breakpoints.horizontalMid}),
    (max-height: ${breakpoints.verticalMid}) {
    font-size: 28px;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  @media (min-width: ${breakpoints.horizontalMid}) {
    font-size: 45px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

export default LandingTitle;
