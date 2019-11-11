import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const H2 = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.font};
  margin: 0;
  padding: 0;
  text-align: center;
  @media (min-width: ${breakpoints.horizontalMid}) {
    font-size: 28px;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    font-size: 20px;
  }
`;

export default H2;
