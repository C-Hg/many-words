import styled, { keyframes } from "styled-components";

const colorCircleAnimation = keyframes`
  0% {
    stroke-dashoffset: 251px;
    opacity: 0.4;
  }
`;

const ColoredCircle = styled.circle`
  stroke: ${props => props.theme.colors[props.color]};
  stroke-dasharray: 251.5px;
  stroke-width: ${props => (props.theme.colors === "gold" ? 14 : 13)};
  fill: transparent;
  stroke-linecap: round;
  animation: ${colorCircleAnimation} 1000ms ease forwards;
`;

export default ColoredCircle;
