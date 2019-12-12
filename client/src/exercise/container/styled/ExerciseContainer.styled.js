import styled from "styled-components";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import breakpoints from "../../../app/breakpoints";

const ExerciseContainer = styled(VerticalFlexbox)`
  align-self: flex-start;
  padding: 0;
  margin: 0 auto 0 auto;
  height: auto;
  @media (max-height: ${breakpoints.verticalMid}) {
    margin-top: 20px;
  }
  @media (min-height: ${breakpoints.verticalMid}) {
    margin-top: ${props => `${(props.screenHeight * 8) / 100}px`};
  }
  @media (min-width: ${breakpoints.horizontalSmall}) {
    width: 500px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 100%;
  }
`;

export default ExerciseContainer;
