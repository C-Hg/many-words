import styled from "styled-components";
import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";
import breakpoints from "../../../app/breakpoints";

const CharactersLine = styled(HorizontalFlexbox)`
  justify-content: space-around;
  height: 46px;
  min-height: 40px;
  width: 100%;
  max-width: 400px;
  background-color: ${props => props.theme.colors.grey};
  border-width: 0px;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    border: 1px solid ${props => props.theme.colors.grey};
  }
`;

export default CharactersLine;
