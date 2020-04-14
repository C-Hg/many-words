import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

const ProgressPercentage = styled.text`
  font-weight: 600;
  opacity: 0;
  fill: ${props => props.theme.colors.darkGrey};
  animation: ${fadeIn} 800ms ease 450ms forwards;
`;

export default ProgressPercentage;
