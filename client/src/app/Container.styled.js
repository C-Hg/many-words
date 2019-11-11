import styled from "styled-components";

const Container = styled.div`
  font-family: "Open Sans", sans-serif;
  width: 100%;
  color: ${props => props.theme.colors.main};
  background-color: ${props => props.backgroundColor};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-top: ${props => (props.withNavbar ? "65px" : "0px")};
  overflow-y: auto;
`;

export default Container;
