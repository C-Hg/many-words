import styled from "styled-components";

const H1 = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.font};
  margin: auto;
  padding: 0;
  text-align: center;
  font-size: 32px;
`;

export default H1;
