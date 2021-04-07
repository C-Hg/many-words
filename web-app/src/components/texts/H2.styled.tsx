import styled from "styled-components";

type Props = {
  alignSelf?: string;
  backgroundColor?: string;
  font?: string;
  fontWeight?: string;
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  margin?: string;
  padding?: string;
  sand?: boolean;
  textAlign?: string;
};

const H2 = styled.p<Props>`
  color: ${(props) => props.color || props.theme.colors.darkGrey};
  font-family: ${(props) => props.fontFamily};
  font-weight: ${(props) => props.fontWeight || "600"};
  margin: ${(props) => props.margin || "0"};
  padding: ${(props) => props.padding || "0"};
  text-align: ${(props) => props.textAlign || "center"};
  font-size: ${(props) => props.fontSize || "28px"};
  background-color: ${(props) =>
    props.sand ? props.theme.colors.sand : "transparent"};
  align-self: ${(props) => props.alignSelf};
`;

export default H2;
