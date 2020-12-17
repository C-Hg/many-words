import styled from "styled-components";

const NavbarLinksContainer = styled.ul`
  background-color: transparent;
  list-style-type: none;
  margin: 0;
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  color: ${(props) => props.theme.colors.white};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-template-rows: 1;
`;

export default NavbarLinksContainer;
