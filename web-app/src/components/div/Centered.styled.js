import styled from "styled-components";

const Centered = styled.div`
  text-align: center;
  margin: ${props => props.margin || "auto"};
`;

export default Centered;
