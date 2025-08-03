import type { HeaderProps } from '@app-types/component.types';
import type React from 'react';

import './header.scss';

const Header: React.FC<HeaderProps> = ({ children }) => (
  <header className="header">{children}</header>
);

export default Header;
