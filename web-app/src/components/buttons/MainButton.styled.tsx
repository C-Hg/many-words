import styled, { keyframes } from "styled-components";

import DefaultButton from "./DefaultButton.styled";

import unstyledLink from "../links/DefaultLink";

type Props = {
  borderColor?: string;
  color: string;
  fast?: boolean;
};

const getAnimation = (color: string) => {
  return keyframes`
    100% {
      color: white;
      background-color: ${color};
      border-color: ${color};
    }
  `;
};

const MainButton = styled(DefaultButton)<Props>`
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
  &:hover {
    animation: ${(props) => getAnimation(props.color)}
      ${(props) => (props.fast ? "0.3s" : "0.5s")} forwards 1;
  }

  > a {
    ${unstyledLink}
  }
`;

export default MainButton;
