import styled from "styled-components";

const Card = styled.div`
  border-color: ${props => props.theme.colors[props.borderColor]};
  display: flex;
  flex-direction: column;
  border-style: solid;
  border-radius: 22px;
  background-color: white;
  margin: 12px 12px 12px;
  height: 120px;
  width: 140px;
  border-width: 2px;
`;

export default Card;
