import React from 'react';
import headerLess from './headerLess.less';
import logoIcon from '@/assets/favicon.svg';
import HeaderMenu from '@/components/menu/HeaderMenu';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <div className={headerLess.header}>
      <div className={headerLess.logo}>
        <img src={logoIcon} alt="logo" />
      </div>
      <div className={headerLess.menu}>
        <HeaderMenu />
      </div>
    </div>
  );
};

export default Header;
