import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";

type Props = {
  sand: boolean;
  screenHeight: number;
};

const ExerciseContainer = styled(VerticalFlexbox)<Props>`
  align-self: flex-start;
  background-color: ${(props) =>
    props.sand ? props.theme.colors.sand : props.theme.colors.white};
  padding: 0;
  margin: 0 auto 0 auto;
  height: auto;
  @media (max-height: ${breakpoints.verticalMid}) {
    margin-top: 20px;
  }
  @media (min-height: ${breakpoints.verticalMid}) {
    margin-top: ${(props) => `${(props.screenHeight * 8) / 100}px`};
  }
  @media (min-width: ${breakpoints.horizontalSmall}) {
    width: 500px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 100%;
  }
`;

export default ExerciseContainer;
