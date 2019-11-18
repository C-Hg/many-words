import styled from "styled-components";

// import breakpoints from "../../app/breakpoints";

const NavbarLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
  margin: auto;
  height: 100%;
  padding-left: 8px;
  padding-right: 8px;
  color: ${props => props.theme.colors.white};
  @media (max-width: 700px) {
    width: 95%;
  }
  @media (min-width: 700px) {
    width: 650px;
  }
`;

export default NavbarLinksContainer;
