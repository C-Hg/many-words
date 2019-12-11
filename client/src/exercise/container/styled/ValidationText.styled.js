import styled from "styled-components";
import P from "../../../components/texts/P.styled";

const ValidationText = styled(P)`
  position: relative;
  left: ${props => props.left};
  top: ${props => props.top};
  font-weight: ${props => props.fontWeight || "400"};
  font-size: ${props => props.fontSize || "18px"};
  margin: 0;
  width: 80%;
  min-width: 80%;
  color: ${props => props.theme.colors.white};
  text-align: left;
`;

export default ValidationText;
