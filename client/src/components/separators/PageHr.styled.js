import styled from "styled-components";

const PageHr = styled.hr`
  width: 90%;
  margin-bottom: -10px auto;
  height: 5px;
  color: ${props => props.theme.colors.darkBlue};
  background-color: ${props => props.theme.colors.darkBlue};
  border: 0;
  border-radius: 5px;
  margin-top: 40px;
`;

export default PageHr;
