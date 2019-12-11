import styled from "styled-components";
import H2 from "../../../components/texts/H2.styled";
import breakpoints from "../../../app/breakpoints";

const ExerciseTitle = styled(H2)`
  text-align: left;
  align-self: flex-start;
  padding-left: 10px;
  font-size: 26px;
  width: auto;
  font-family: ${props => props.theme.fonts.secondary};
  @media (min-height: ${breakpoints.verticalMid}) {
    margin-bottom: 30px;
  }
  @media (max-height: ${breakpoints.verticalMid}) {
    margin-bottom: 15px;
  }
`;

export default ExerciseTitle;
