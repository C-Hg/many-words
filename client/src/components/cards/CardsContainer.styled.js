import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
  margin: auto;
  @media (min-width: ${breakpoints.horizontalMid}) {
    width: 65%;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    width: 85%;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 100%;
  }
`;

export default CardsContainer;
