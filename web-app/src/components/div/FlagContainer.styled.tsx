import styled from "styled-components";

type Props = {
  marginRight?: string;
  marginTop?: string;
};

const FlagContainer = styled.div<Props>`
  align-self: flex-start;
  margin-top: ${(props) => props.marginTop};
  margin-right: ${(props) => props.marginRight};
  width: 30px;
  min-width: 30px;
  height: 22.5px;
  min-height: 22.5px;
`;

export default FlagContainer;
