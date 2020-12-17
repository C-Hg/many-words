import styled from "styled-components";

const Navbar = styled.nav`
  background-color: ${(props) => props.theme.colors.darkBlue};
  height: 60px;
  margin-top: -60px;
  width: 100%;
  position: fixed;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export default Navbar;
