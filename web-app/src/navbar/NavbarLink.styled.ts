import styled from "styled-components";

const NavbarLink = styled.li`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
  font-family: ${(props) => props.theme.fonts.main};
  border: 0;
  margin: 0;
  border-bottom: 3px solid ${(props) => props.theme.colors.darkBlue};
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  &:hover {
    border-bottom-color: ${(props) => props.theme.colors.white};
  }
`;

export default NavbarLink;
