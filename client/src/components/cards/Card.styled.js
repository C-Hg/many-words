import styled from "styled-components";

const Card = styled.div`
  position: static;
  border-color: ${props => props.theme.colors[props.borderColor]};
  height: ${props => props.height};
  width: ${props => props.width};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-radius: 16px;
  background-color: white;
  margin: 12px 12px 12px;
  border-width: 2px;
`;

export default Card;
