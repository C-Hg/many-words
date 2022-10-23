import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";
import DefaultButton from "../../../components/buttons/DefaultButton.styled";

const ContinueButton = styled(DefaultButton)`
  color: ${(props) => props.color || props.theme.colors.white};
  position: absolute;
  background-color: transparent;
  width: auto;
  height: auto;
  border: 0;
  right: 50px;
  @media (max-width: ${breakpoints.horizontalSmall}) {
    right: 30px;
  }
`;

export default ContinueButton;
