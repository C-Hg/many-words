import styled from "styled-components";

const Navbar = styled.nav`
  background-color: ${(props) => props.theme.colors.darkBlue};
  box-shadow: 0px 0px 15px grey;
  height: 60px;
  margin-top: -60px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
`;

export default Navbar;
