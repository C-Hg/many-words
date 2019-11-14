import styled from "styled-components";
import breakpoints from "../../../app/breakpoints";

const StyledFeatures = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: ${breakpoints.horizontalMid}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    max-width: 850px;
  }
  @media (min-width: ${breakpoints.horizontalSmall}) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-evenly;
    width: 90%;
  }
  @media (max-width: $${breakpoints.horizontalSmall}),
    (max-height: ${breakpoints.verticalSmall}) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }
`;

export default StyledFeatures;
