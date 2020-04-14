import styled from "styled-components";
import DefaultLink from "./DefaultLink.styled";

const ScalingLink = styled(DefaultLink)`
  &:hover {
    transform: scale(1.15);
  }
`;

export default ScalingLink;
