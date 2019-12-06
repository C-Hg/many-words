import styled from "styled-components";

const Container = styled.div`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props =>
    props.sand ? props.theme.colors.sand : props.theme.colors.white};
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "100%"};
  margin: ${props => props.margin || "0 auto 0 auto"};
`;

export default Container;
