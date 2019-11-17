import styled, { keyframes } from "styled-components";
import DefaultButton from "./DefaultButton.styled";

const getAnimation = color => {
  return keyframes`
    100% {
      color: white;
      background-color: ${color};
      border-color: ${color};
    }
  `;
};

const MainButton = styled(DefaultButton)`
  border-color: ${props => props.borderColor || props.color};
  color: ${props => props.color};
  font-family: ${props => props.theme.fonts.secondary};
  text-align: center;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid;
  background-color: inherit;
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  font-size: 18px;
  &:hover {
    animation: ${props => getAnimation(props.color)} 0.5s forwards 1;
  }
`;

export default MainButton;
