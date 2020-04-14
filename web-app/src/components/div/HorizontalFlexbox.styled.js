import styled from "styled-components";
import Container from "./Container.styled";

const HorizontalFlexbox = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: ${props => props.flexWrap};
  justify-content: ${props => props.justifyContent || "center"};
  width: ${props => props.width || "100%"};
  height: ${props => props.height || "auto"};
  border: ${props => props.border || "0"};
  border-radius: ${props => props.borderRadius || "0"};
  padding: ${props => props.padding || "0"};
  margin: ${props => props.margin || "auto"};
  z-index: ${props => props.zIndex || 1};
  background-color: ${props =>
    props.sand ? props.theme.colors.sand : props.backgroundColor};
`;

export default HorizontalFlexbox;
