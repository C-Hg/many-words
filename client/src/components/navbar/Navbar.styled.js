import styled from "styled-components";

const Navbar = styled.header`
  background-color: ${props => props.theme.colors.darkBlue};
  opacity: 1;
  height: 60px;
  margin-top: -60px;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Navbar;
