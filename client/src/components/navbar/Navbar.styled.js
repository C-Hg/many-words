import styled from "styled-components";

const Navbar = styled.header`
  height: 65px;
  margin-top: -65px;
  background-color: ${props => props.theme.colors.darkBlue};
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
`;

export default Navbar;
