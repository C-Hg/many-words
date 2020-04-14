import styled from "styled-components";

const EmptyBar = styled.line`
  stroke-width: 30px;
  stroke-linecap: round;
  stroke: ${props => props.theme.colors.lightestGrey};
  fill: black;
`;

export default EmptyBar;
