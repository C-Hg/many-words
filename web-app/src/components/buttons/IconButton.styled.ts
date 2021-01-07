import styled from "styled-components";

import DefaultButton from "./DefaultButton.styled";

type Props = {
  left?: string;
  right?: string;
};

const IconButton = styled(DefaultButton)<Props>`
  color: ${(props) => props.color || props.theme.colors.white};
  position: absolute;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  background-color: transparent;
  width: auto;
  height: auto;
  border: 0;
`;

export default IconButton;
