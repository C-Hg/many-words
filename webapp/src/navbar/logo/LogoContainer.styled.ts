import styled from "styled-components";

const LogoContainer = styled.li`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.main};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default LogoContainer;
