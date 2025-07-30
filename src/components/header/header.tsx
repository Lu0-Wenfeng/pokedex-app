import React from 'react';
import type { HeaderProps } from '@app-types/component.types';
import './header.scss';

const Header: React.FC<HeaderProps> = ({ children }) => (
  <header className="header">{children}</header>
);

export default Header;
