import styled from "styled-components";

const NavbarList = styled.ul`
  background-color: transparent;
  list-style-type: none;
  width: 100%;
  max-width: 400px;
  padding: 0;
  margin: 0;
  margin-bottom: 3px;
  padding-left: 10px;
  padding-right: 10px;
  color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: space-between;
  justify-content: space-between;
`;

export default NavbarList;
