import styled from "styled-components";
import DefaultButton from "../../../components/buttons/DefaultButton.styled";

const Character = styled(DefaultButton)`
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 4px;
  color: ${props => props.theme.colors.darkGrey};
  background-color: ${props => props.theme.colors.white};
  text-align: center;

  font-size: 19px;
  width: 9%;
  max-width: 10%;
  margin-left: 0.5%;
  margin-right: 0.5%;
  height: 92%;

  &:hover {
    background-color: ${props => props.theme.colors.lightestGrey};
  }
`;

export default Character;
