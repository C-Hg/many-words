import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";

type Props = {
  screenHeight: number;
};

const ExerciseContainer = styled(VerticalFlexbox)<Props>`
  align-self: flex-start;
  background-color: ${(props) => props.theme.colors.sand};
  padding: 10px;
  height: auto;
  margin-top: 10px;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    width: 500px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 100%;
  }
`;

export default ExerciseContainer;
