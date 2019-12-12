import styled from "styled-components";
import P from "../../../components/texts/P.styled";

const ValidationText = styled(P)`
  position: relative;
  left: ${props => props.left};
  top: ${props => props.top};
  font-weight: ${props => props.fontWeight || "400"};
  font-size: ${props => props.fontSize || "18px"};
  margin: 0;
  width: auto;
  max-width: 70%;
  color: ${props => props.theme.colors.white};
  text-align: left;
`;

export default ValidationText;
