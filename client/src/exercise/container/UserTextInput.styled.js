import styled from "styled-components";
import breakpoints from "../../app/breakpoints";

const UserTextInput = styled.textarea`
  background-color: inherit;
  font-size: 19px;
  font-weight: 500;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.darkBlue};
  background-color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.colors.grey};
  padding-top: 5px;
  padding-left: 10px;
  border-radius: 8px;
  resize: none;
  height: 80px;
  @media (min-width: ${breakpoints.horizontalMid}) {
    padding-bottom: 7px;
    width: 400px;
  }
  @media (max-width: ${breakpoints.horizontalMid}) {
    padding-bottom: 3px;
    width: 350px;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    width: 100%;
  }
  &:focus {
    outline: none;
  }
`;

export default UserTextInput;
