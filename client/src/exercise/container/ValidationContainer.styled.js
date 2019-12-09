import styled from "styled-components";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";

const ValidationContainer = styled(HorizontalFlexbox)`
  line-height: 0;
  position: relative;
  height: 100px;
  background-color: ${props =>
    props.isChecking ? props.backgroundColor : props.theme.colors.sand};
  top: 20px;
  color: ${props => props.theme.colors.white};
  margin: 0;
`;

export default ValidationContainer;
