import styled from "styled-components";

const Container = styled.div`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props =>
    props.backgroundColor || props.theme.colors.white};
  width: 100%;
`;

export default Container;
