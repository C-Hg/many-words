import styled from "styled-components";

const H1 = styled.p`
  color: ${props => props.color};
  font-family: ${props => props.font};
  margin-top: 30px;
  padding: 0;
  text-align: center;
  font-weight: 600;
  font-size: 36px;
`;

export default H1;
