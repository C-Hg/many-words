import styled from "styled-components";
import Container from "./Container.styled";

const HorizontalFlexbox = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justifyContent || "center"};
  width: ${props => props.width || "100%"};
  border: ${props => props.border || "0"};
  border-radius: ${props => props.borderRadius || "0"};
  padding: ${props => props.padding || "0"};
`;

export default HorizontalFlexbox;
