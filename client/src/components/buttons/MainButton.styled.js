import styled, { keyframes } from "styled-components";
import DefaultButton from "./DefaultButton.styled";

const getAnimation = color => {
  return keyframes`
    100% {
      color: white;
      background-color: ${color};
      border-color: black;
    }
  `;
};

const MainButton = styled(DefaultButton)`
  border-color: ${props => props.color || "inherit"};
  color: ${props => props.color || "inherit"};
  text-align: center;
  font-weight: normal;
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
    animation: ${props => getAnimation(props.color)} 0.3s forwards 1;
  }
`;

export default MainButton;
