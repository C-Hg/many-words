import styled from "styled-components";

import H2 from "../../../components/texts/H2.styled";

const Instructions = styled(H2)`
  text-align: left;
  align-self: flex-start;
  font-style: italic;
  padding-left: 10px;
  font-weight: 400;
  font-size: 20px;
  width: auto;
  font-family: ${(props) => props.theme.fonts.main};
  margin-bottom: 5px;
`;

export default Instructions;
