import styled from "styled-components";

type Props = {
  margin?: string;
  alignSelf?: string;
  fit?: boolean;
  large?: boolean;
  mid?: boolean;
  small?: boolean;
};

const ButtonContainer = styled.div<Props>`
  margin: ${(props) => props.margin || "auto"};
  align-self: ${(props) => props.alignSelf};
  width: ${(props) => {
    if (props.fit) {
      return "100%";
    }
    if (props.large) {
      return "280px";
    }
    if (props.mid) {
      return "180px";
    }
    if (props.small) {
      return "120px";
    }
    return "auto";
  }};
  min-width: ${(props) => {
    if (props.large) {
      return "280px";
    }
    if (props.mid) {
      return "180px";
    }
    if (props.small) {
      return "120px";
    }
    return "auto";
  }};
  height: ${(props) => {
    if (props.large) {
      return "50px";
    }
    if (props.mid) {
      return "45px";
    }
    if (props.small) {
      return "40px";
    }
    return "50px";
  }};
  min-height: ${(props) => {
    if (props.large) {
      return "50px";
    }
    if (props.mid) {
      return "45px";
    }
    if (props.small) {
      return "40px";
    }
    return "50px";
  }};
`;

export default ButtonContainer;
