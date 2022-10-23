import styled from "styled-components";

type Props = {
  backgroundColor?: string;
  font?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
  margin?: string;
  padding?: string;
  sand?: boolean;
  textAlign?: string;
};

const H3 = styled.p<Props>`
  color: ${(props) => props.color || props.theme.colors.darkGrey};
  font-family: ${(props) => props.font};
  font-weight: ${(props) => props.fontWeight || "600"};
  font-family: ${(props) => props.fontSize || "20px"};
  margin: ${(props) => props.margin || 0};
  padding: ${(props) => props.padding || 0};
  text-align: ${(props) => props.textAlign || "center"};
  font-size: ${(props) => props.fontSize || "20px"};
  background-color: ${(props) =>
    props.sand ? props.theme.colors.sand : props.backgroundColor};
  line-height: ${(props) => props.lineHeight};
`;

export default H3;
