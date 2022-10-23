import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";

type Props = {
  backgroundColor: string;
  isChecking: boolean;
};

const ValidationContainer = styled(HorizontalFlexbox)<Props>`
  line-height: 0;
  position: relative;
  height: 100px;
  width: 100%;
  background-color: ${(props) =>
    props.isChecking ? props.backgroundColor : props.theme.colors.sand};
  top: 20px;
  color: ${(props) => props.theme.colors.white};
  margin: 0;
  margin-bottom: 40px;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    border-radius: 12px;
  }
`;

export default ValidationContainer;
