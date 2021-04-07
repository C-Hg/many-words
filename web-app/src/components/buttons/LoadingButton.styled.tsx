import styled from "styled-components";

import DefaultButton from "./DefaultButton.styled";

import unstyledLink from "../links/DefaultLink";

type Props = {
  borderColor?: string;
  color: string;
  disabled?: boolean;
  fast?: boolean;
};

const LoadingButton = styled(DefaultButton)<Props>`
  border-color: ${(props) => props.borderColor || props.color};
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.fonts.secondary};
  text-align: center;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid;
  background-color: inherit;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 16px;

  > a {
    ${unstyledLink}
  }

  &:hover {
    cursor: wait;
  }
`;

export default LoadingButton;
