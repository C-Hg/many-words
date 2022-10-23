import styled from "styled-components";

const GreyCircle = styled.circle`
  stroke-width: 13;
  fill: transparent;
  stroke: ${props => props.theme.colors.lightestGrey};
`;

export default GreyCircle;
