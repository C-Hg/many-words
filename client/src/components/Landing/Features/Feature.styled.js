import styled from "styled-components";
import breakpoints from "../../../app/breakpoints";

const StyledFeature = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${breakpoints.horizontalMid}),
    (max-height: ${breakpoints.verticalMid}) {
    margin-bottom: 20px;
  }
`;

export default StyledFeature;
