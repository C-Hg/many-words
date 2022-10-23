import styled from "styled-components";

// mostly disabling useless or annoying features
const DefaultLink = styled.a`
  text-align: center;
  color: ${props => props.theme.fonts.main};
  &:hover {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: inherit;
    text-decoration: none;
  }
  &:visited {
    color: inherit;
  }
  text-decoration: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /* prevents shifting on click */
  margin: 0;
  padding: 0;
`;

export default DefaultLink;
