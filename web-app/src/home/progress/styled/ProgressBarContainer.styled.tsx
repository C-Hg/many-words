import styled from "styled-components";

const ProgressBarContainer = styled.div`
  font-family: ${(props) => props.theme.fonts.main};
  color: ${(props) => props.theme.colors.darkGrey};
  background-color: ${(props) => props.theme.colors.sand};
  width: 330px;
  height: 100%;
  margin: 0 auto 0 auto;
  padding: 0;
`;

export default ProgressBarContainer;
