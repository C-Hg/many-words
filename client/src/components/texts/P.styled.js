import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const P = styled.p`
  margin: ${props => props.margin || "20px auto 0 auto"};
  font-family: ${props => props.theme.fonts.main};
  font-weight: ${props => props.fontWeight || "400"};
  text-align: ${props => props.textAlign || "center"};
  font-size: 18px;
  color: ${props => props.color || props.theme.colors.darkGrey};
  @media (min-width: ${breakpoints.horizontalMid}) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    width: 90%;
  }
`;

export default P;
