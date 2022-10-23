import styled from "styled-components";

const Logo = styled.p`
  font-family: ${(props) => props.theme.fonts.cursive};
  font-size: 24px;
  font-weight: "400";
  margin: 0;
  margin-left: 20px;
  padding: 0;
  text-align: center;
  &:after {
    position: relative;
    content: "beta";
    left: 8px;
    bottom: 10px;
    font-size: 20px;
  }
`;

export default Logo;
