import styled from "styled-components";

interface Props {
  withNavbar: boolean;
}

const AppContainer = styled.div<Props>`
  background-color: "red";
  font-family: ${(props) => props.theme.fonts.main};
  color: ${(props) => props.theme.colors.darkGrey};
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: ${(props) => (props.withNavbar ? "60px" : "0px")};
  overflow-y: auto;
`;

export default AppContainer;
