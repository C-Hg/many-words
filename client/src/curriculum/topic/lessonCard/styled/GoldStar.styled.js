import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
100% {
      opacity: 1;
    }
`;

const GoldStar = styled.div`
  color: ${props => props.theme.colors.gold};
  position: relative;
  text-align: center;
  top: -87px;
  height: 0;
  line-height: 0;
  width: 100%;
  opacity: 0;
  animation: ${fadeIn} 800ms ease 450ms forwards;
`;

export default GoldStar;
