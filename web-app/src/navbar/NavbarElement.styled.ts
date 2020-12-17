import styled from "styled-components";

const NavbarElement = styled.li`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.main};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

export default NavbarElement;
