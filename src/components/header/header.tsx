import { HeaderProps } from "@app-types/component.types";
import React from "react";
import "./header.scss";

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <header className="header">{children}</header>;
};

export default Header;
