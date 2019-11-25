import styled, { keyframes } from "styled-components";
import P from "../../../components/texts/P.styled";

const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

const ProgressPercentage = styled(P)`
  font-weight: 600;
  position: relative;
  text-align: center;
  width: 100%;
  height: 0;
  opacity: 0;
  top: -80px;
  z-index: 5;
  animation: ${fadeIn} 800ms ease 450ms forwards;
`;

export default ProgressPercentage;
