import { Link } from "react-router-dom";
import styled from "styled-components";

import unstyledLink from "./DefaultLink";

const NavigationLink = styled(Link)`
  ${unstyledLink}
`;

export default NavigationLink;
