import styled from "styled-components";
import HorizontalFlexbox from "../../components/div/HorizontalFlexbox.styled";
import breakpoints from "../../app/breakpoints";

const ValidationContainer = styled(HorizontalFlexbox)`
  line-height: 0;
  position: relative;
  height: 100px;
  width: 100%;
  background-color: ${props =>
    props.isChecking ? props.backgroundColor : props.theme.colors.sand};
  top: 20px;
  color: ${props => props.theme.colors.white};
  margin: 0;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    border-radius: 12px;
  }
`;

export default ValidationContainer;
