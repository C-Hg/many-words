import styled from "styled-components";
import { Link } from "react-router-dom";
import unstyledLink from "./DefaultLink";

const NavigationLink = styled(Link)`
  ${unstyledLink}
`;

export default NavigationLink;
