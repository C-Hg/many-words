import styled from "styled-components";
import VerticalFlexbox from "../../../components/div/VerticalFlexbox.styled";
import breakpoints from "../../../app/breakpoints";

const DetailledStatsContainer = styled(VerticalFlexbox)`
  margin-top: 20px;
  @media (min-width: ${breakpoints.horizontalMid}) {
    flex-direction: row;
    justify-content: space-evenly;
    width: 650px;
    height: 140px;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    justify-content: space-between;
    height: 360px;
  }
`;

export default DetailledStatsContainer;
