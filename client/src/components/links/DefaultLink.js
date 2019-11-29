const unstyledLink = `
&:hover {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: inherit;
    text-decoration: none;
  }
  &:visited {
    color: inherit;
  }
  text-decoration: none;
  -moz-appearance: none;
  -webkit-appearance: none;`;

export default unstyledLink;
