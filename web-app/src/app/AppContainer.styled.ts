import styled from "styled-components";

const AppContainer = styled.div`
  background-color: ${(props) => props.theme.colors.sand};
  font-family: ${(props) => props.theme.fonts.main};
  color: ${(props) => props.theme.colors.darkGrey};
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: 60px;
  overflow-y: auto;
`;

export default AppContainer;
