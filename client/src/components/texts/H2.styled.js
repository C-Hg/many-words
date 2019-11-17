import styled from "styled-components";

const H2 = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.font};
  font-weight: ${props => props.fontWeight || "600"};
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 28px;
`;

export default H2;