import styled from "styled-components";
import DefaultButton from "../components/buttons/DefaultButton.styled";

const NavbarLink = styled(DefaultButton)`
  background-color: ${props => props.theme.colors.darkBlue};
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.main};
  border: 0;
  border-bottom: 3px solid ${props => props.theme.colors.darkBlue};
  padding-left: 8px;
  padding-right: 8px;
  width: auto;
  height: 100%;
  &:hover {
    border-bottom-color: ${props => props.theme.colors.white};
  }
`;

export default NavbarLink;
