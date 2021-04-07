import styled from "styled-components";

const DetailedProgressHr = styled.hr`
  width: 90%;
  height: 2px;
  border: 0;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.darkBlue};
  background-color: ${(props) => props.theme.colors.darkBlue};
`;

export default DetailedProgressHr;
