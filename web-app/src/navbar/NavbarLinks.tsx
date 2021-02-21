import { Book } from "@styled-icons/ionicons-outline/Book";
import { Home } from "@styled-icons/ionicons-outline/Home";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import NavbarLink from "./NavbarLink.styled";
import NavbarList from "./NavbarList.styled";

import theme from "../app/theme";

const NavbarLinks = () => {
  const { pathname } = useLocation();

  return (
    <NavbarList>
      <NavbarLink isActive={pathname === "/learn"}>
        <Link to="/learn">
          <Book color={theme.colors.white} size="28" title="learn" />
        </Link>
      </NavbarLink>
      <NavbarLink isActive={pathname === "/home"}>
        <Link to="/home">
          <Home color={theme.colors.white} size="28" title="home" />
        </Link>
      </NavbarLink>
    </NavbarList>
  );
};

export default NavbarLinks;
