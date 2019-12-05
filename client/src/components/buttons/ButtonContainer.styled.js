import styled from "styled-components";

const ButtonContainer = styled.div`
  margin: ${props => props.margin || "auto"};
  align-self: ${props => props.alignSelf};
  width: ${props => {
    if (props.large) {
      return "280px";
    }
    if (props.mid) {
      return "180px";
    }
    return "100%";
  }};
  height: ${props => {
    if (props.large) {
      return "50px";
    }
    if (props.mid) {
      return "45px";
    }
    return "50px";
  }};
`;

export default ButtonContainer;
