import styled from "styled-components";

import breakpoints from "../../app/breakpoints";
import Container from "../../components/div/Container.styled";

const UpcomingContainer = styled(Container)`
  margin: 0 auto 100px auto;
  @media (min-width: ${breakpoints.horizontalMid}) {
    width: 80%;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    width: 95%;
  }
`;

export default UpcomingContainer;
