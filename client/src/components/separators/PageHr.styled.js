import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const PageHr = styled.hr`
  width: 90%;
  margin-bottom: -10px auto;
  height: 5px;
  color: ${props => props.theme.colors.darkBlue};
  background-color: ${props => props.theme.colors.darkBlue};
  border: 0;
  border-radius: 5px;
  @media (min-width: ${breakpoints.horizontalMid}) {
    margin-top: 100px;
  }
  @media (max-width: ${breakpoints.horizontalMid}),
    (max-height: ${breakpoints.verticalMid}) {
    margin-top: 60px;
  }
`;

export default PageHr;
