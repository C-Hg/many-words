import styled from "styled-components";

type Props = {
  isActive?: boolean;
};

const NavbarLink = styled.li<Props>`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
  padding: 0;
  margin-left: 30px;
  margin-right: 30px;
  border-bottom: solid medium ${(props) => props.theme.colors.darkBlue};
  border-bottom-color: ${(props) =>
    props.isActive ? props.theme.colors.white : props.theme.colors.darkBlue};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default NavbarLink;
