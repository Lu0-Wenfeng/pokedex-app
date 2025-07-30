import React from 'react';
import "./header.scss";
import { HeaderProps } from '../../types/component.types';

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="header">
      {children}
    </header>
  );
};

export default Header;
