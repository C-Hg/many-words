import styled from "styled-components";
import DefaultButton from "../../components/buttons/DefaultButton.styled";

const Close = styled(DefaultButton)`
  color: ${props => props.theme.colors.white};
  position: absolute;
  left: 20px;
  background-color: transparent;
  width: auto;
  height: auto;
  border: 0;
`;

export default Close;
