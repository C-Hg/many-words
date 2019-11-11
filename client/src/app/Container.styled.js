import styled from "styled-components";

const Container = styled.div`
  font-family: ${props => props.theme.fonts.main};
  width: 100%;
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props => props.backgroundColor || "transparent"};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: ${props => (props.withNavbar ? "65px" : "0px")};
  overflow-y: auto;
`;

export default Container;
