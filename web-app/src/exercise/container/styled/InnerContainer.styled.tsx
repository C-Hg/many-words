import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";

const InnerContainer = styled(HorizontalFlexbox)`
  justify-content: flex-start;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    width: 480px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 92%;
  }
`;

export default InnerContainer;
