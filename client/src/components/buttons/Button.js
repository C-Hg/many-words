import styled from "styled-components";

const Button = styled.button`
  /* general styling */
  &:hover {
    cursor: pointer;
    outline: none;
    &:focus {
      outline: none;
    }
  }
  &:focus {
    outline: none;
  }
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-tap-highlight-color: transparent;
  /* remove dotted outline on button clic */
  -moz-focus-outer {
    outline: none;
  }
  -moz-focus-inner {
    border: 0;
  }
  /* prevents shifting on click */
  margin: 0;
  padding: 0;
`;

export default Button;
