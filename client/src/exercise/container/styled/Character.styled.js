import styled from "styled-components";
import DefaultButton from "../../../components/buttons/DefaultButton.styled";

const Character = styled(DefaultButton)`
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 8px;
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props => props.theme.colors.white};
  text-align: center;

  font-size: 19px;
  width: 8%;
  max-width: 30px;
  height: 40px;

  &:hover {
    background-color: ${props => props.theme.colors.lightestGrey};
  }
`;

export default Character;
