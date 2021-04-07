import { Spinner3 } from "@styled-icons/evil";
import styled, { keyframes } from "styled-components";

const spinning = () =>
  keyframes`
    from {
    transform: rotate(0deg);
  }
    to {
      transform: rotate(360deg);
    }
  `;

const Spinner = styled(Spinner3)`
  animation: ${spinning} infinite 1s linear;
`;

export default Spinner;
