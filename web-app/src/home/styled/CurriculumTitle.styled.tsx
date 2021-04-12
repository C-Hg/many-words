import styled from "styled-components";

import H2 from "../../components/texts/H2.styled";

const CurriculumTitle = styled(H2)`
  text-align: center;
  align-self: center;
  font-weight: 600;
  font-size: 28px;
  width: auto;
  font-family: ${(props) => props.theme.fonts.main};
  margin-bottom: 20px;
`;

export default CurriculumTitle;
