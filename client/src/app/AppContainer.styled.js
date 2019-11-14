import styled from "styled-components";

const AppContainer = styled.div`
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props =>
    props.backgroundColor || props.theme.colors.white};
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: ${props => (props.withNavbar ? "65px" : "0px")};
  overflow-y: auto;
`;

export default AppContainer;
