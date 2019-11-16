import styled, { keyframes } from "styled-components";

const fillProgressBar = keyframes`
    0% {
        stroke-dashoffset: 300px;
        opacity: 0.4;
    }
`;

const FilledBar = styled.line`
  stroke-width: 30px;
  stroke-linecap: round;
  stroke: ${props => props.theme.colors.green};
  stroke-dasharray: 300px;
  animation: ${fillProgressBar} 1000ms ease 400ms forwards;
`;

export default FilledBar;
