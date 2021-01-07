import styled from "styled-components";

import Container from "./Container.styled";

type Props = {
  alignItems?: string;
  alignSelf?: string;
  border?: string;
  borderRadius?: string;
  colors?: string;
  height?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  sand?: boolean;
  width?: string;
};

const VerticalFlexbox = styled(Container)<Props>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  margin: ${(props) => props.margin || "auto"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  border: ${(props) => props.border || "0"};
  border-radius: ${(props) => props.borderRadius || "0"};
  padding: ${(props) => props.padding || "0"};
  background-color: ${(props) =>
    props.sand ? props.theme.colors.sand : props.colors};

  align-self: ${(props) => props.alignSelf};
`;

export default VerticalFlexbox;
