import styled from "styled-components";

const H1 = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.font};
  margin: ${props => props.margin || "30px 0 0 0"};
  padding: 0;
  text-align: center;
  font-weight: 600;
  font-size: 36px;
`;

export default H1;
