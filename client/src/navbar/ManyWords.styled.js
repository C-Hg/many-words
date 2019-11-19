import styled from "styled-components";

const ManyWords = styled.p`
  font-family: ${props => props.theme.fonts.cursive};
  font-size: 26px;
  font-weight: "400";
  margin: 0;
  padding: 0;
  &:after {
    position: relative;
    content: "beta";
    left: 8px;
    bottom: 10px;
    font-size: 20px;
  }
`;

export default ManyWords;
