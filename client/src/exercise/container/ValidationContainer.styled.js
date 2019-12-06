import styled from "styled-components";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";

const ValidationContainer = styled(HorizontalFlexbox)`
  position: relative;
  height: 100px;
  background-color: ${props => props.backgroundColor};
  top: 30px;
  color: ${props => props.theme.colors.white};
  margin: 0;
`;

export default ValidationContainer;
