import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: ${props => props.margin || "auto"};
  width: ${props => (props.large ? "280px" : "100%")};
  height: ${props => (props.large ? "50px" : "100%")};
`;

export default ButtonContainer;
