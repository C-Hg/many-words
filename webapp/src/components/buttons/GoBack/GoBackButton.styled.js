import styled from "styled-components";
import DefaultButton from "../DefaultButton.styled";

const GoBackButton = styled(DefaultButton)`
  color: ${props => props.color || props.theme.colors.darkGrey};
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: transparent;
  width: auto;
  height: auto;
  border: 0;
`;

export default GoBackButton;
