import styled from "styled-components";

import breakpoints from "../../../app/breakpoints";

const UserTextInput = styled.textarea`
  background-color: inherit;
  font-size: 19px;
  font-weight: 500;
  font-family: ${(props) => props.theme.fonts.main};
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.grey};
  padding-top: 5px;
  padding-left: 10px;
  border-radius: 8px;
  resize: none;
  height: 80px;
  @media (min-width: ${breakpoints.horizontalSmall}) {
    padding-bottom: 7px;
    width: 75%;
  }
  @media (max-width: ${breakpoints.horizontalSmall}) {
    padding-bottom: 3px;
    width: 75%;
  }
  &:focus {
    outline: none;
  }
`;

export default UserTextInput;
