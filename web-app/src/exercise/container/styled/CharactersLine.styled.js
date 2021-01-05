import styled from "styled-components";

import HorizontalFlexbox from "../../../components/div/HorizontalFlexbox.styled";

const CharactersLine = styled(HorizontalFlexbox)`
  justify-content: ${(props) => props.justifyContent || "space-around"};
  height: 44px;
  width: 100%;
  max-width: 400px;
  background-color: transparent;
  border-width: 0px;
`;

export default CharactersLine;
