import styled from "styled-components";

import Container from "../../components/div/Container.styled";

const WordsToRemember = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 30px;
  max-width: 400px;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.sand};
`;

export default WordsToRemember;
