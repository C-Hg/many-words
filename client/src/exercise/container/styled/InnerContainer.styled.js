import styled from "styled-components";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";
import breakpoints from "../../../app/breakpoints";

const InnerContainer = styled(HorizontalFlexbox)`
  justify-content: flex-start;
  padding: 0 10px 0 10px;

  @media (min-width: ${breakpoints.horizontalSmall}) {
    width: 480px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: ${props => {
      return `${props.screenWidth - 20}px`;
    }};
  }
`;

export default InnerContainer;
