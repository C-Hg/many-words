import styled from "styled-components";

const H3 = styled.p`
  color: ${props => props.color || props.theme.colors.darkGrey};
  font-family: ${props => props.font};
  font-weight: ${props => props.fontWeight || "600"};
  font-family: ${props => props.fontSize || "20px"};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  text-align: center;
  font-size: ${props => props.fontSize || "20px"};
  background-color: ${props =>
    props.sand ? props.theme.colors.sand : props.theme.colors.white};
  line-height: ${props => props.lineHeight};
`;

export default H3;
