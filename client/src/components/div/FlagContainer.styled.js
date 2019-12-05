import styled from "styled-components";

const FlagContainer = styled.div`
  align-self: ${props => props.alignSelf};
  margin-top: ${props => props.marginTop};
  margin-right: ${props => props.marginRight};
  width: 30px;
  min-width: 30px;
  height: 22.5px;
  min-height: 22.5px;
`;

export default FlagContainer;
