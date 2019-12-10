import styled from "styled-components";
import DefaultButton from "./DefaultButton.styled";

const IconButton = styled(DefaultButton)`
  color: ${props => props.color || props.theme.colors.white};
  position: absolute;
  left: ${props => props.left};
  right: ${props => props.right};
  background-color: transparent;
  width: auto;
  height: auto;
  border: 0;
`;

export default IconButton;
