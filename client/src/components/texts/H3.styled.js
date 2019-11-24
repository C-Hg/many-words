import styled from "styled-components";

const H3 = styled.p`
  color: ${props => props.color || props.theme.colors.darkGrey};
  font-family: ${props => props.font};
  font-weight: ${props => props.fontWeight || "600"};
  font-family: ${props => props.fontSize || "20px"};
  margin: ${props => props.margin || 0};
  padding: 0;
  text-align: center;
`;

export default H3;
