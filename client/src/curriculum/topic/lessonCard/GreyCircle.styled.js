import styled from "styled-components";

const GreyCircle = styled.circle`
  stroke-width: 14;
  fill: transparent;
  stroke: ${props => props.theme.colors.lightestGrey};
`;

export default GreyCircle;
