import React from 'react';
import headerLess from '../../style/components/headerLess.less';
import logoIcon from '@/assets/favicon.svg';
import HeaderMenu from '@/components/menu/HeaderMenu';
import { useHistory } from 'umi';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const gotoHome = () => {
    history.push('/');
  };
  return (
    <div className={headerLess.header}>
      <div className={headerLess.logo}>
        <img src={logoIcon} alt="logo" onClick={gotoHome} />
      </div>
      <div className={headerLess.menu}>
        <HeaderMenu />
      </div>
    </div>
  );
};

export default Header;
