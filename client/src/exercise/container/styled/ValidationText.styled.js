import styled from "styled-components";

const ValidationText = styled.div`
  font-weight: ${props => props.fontWeight || "400"};
  font-size: ${props => props.fontSize || "18px"};
  margin-left: 40px;
  padding-left: ${props => props.paddingLeft};
  max-width: 70%;
  color: ${props => props.theme.colors.white};
  text-align: left;
`;

export default ValidationText;
