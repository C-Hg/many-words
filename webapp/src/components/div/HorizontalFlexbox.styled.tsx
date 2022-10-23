import styled from "styled-components";

import Container from "./Container.styled";

type Props = {
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  flexWrap?: string;
  height?: string;
  justifyContent?: string;
  margin?: string;
  padding?: string;
  sand?: boolean;
  width?: string;
  zIndex?: string;
};

const HorizontalFlexbox = styled(Container)<Props>`
  align-items: center;
  background-color: ${(props) =>
    props.sand ? props.theme.colors.sand : props.backgroundColor};
  border-radius: ${(props) => props.borderRadius || "0"};
  border: ${(props) => props.border || "0"};
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => props.flexWrap};
  height: ${(props) => props.height || "auto"};
  justify-content: ${(props) => props.justifyContent || "center"};
  margin: ${(props) => props.margin || "auto"};
  padding: ${(props) => props.padding || "0"};
  width: ${(props) => props.width || "100%"};
  z-index: ${(props) => props.zIndex || 1};
`;

export default HorizontalFlexbox;
