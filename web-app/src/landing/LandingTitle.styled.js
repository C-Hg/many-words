import styled from "styled-components";

const LandingTitle = styled.h1`
  font-weight: 600;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 50px auto 30px auto;
  text-align: center;
  font-size: 40px;
`;

export default LandingTitle;
