import React, { useEffect, useRef } from 'react';
import headerLess from '../../style/components/header-less.less';
import logoIcon from '@/assets/favicon.svg';
import HeaderMenu from '@/components/menu/HeaderMenu';
import { useHistory } from 'umi';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const history = useHistory();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const gotoHome = () => {
    history.push('/');
  };
  const windowMoveEvent = (e: Event) => {
    if (headerRef.current) {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 100) {
        headerRef.current.setAttribute(
          'style',
          'height: 80px; box-shadow: 0 10px 40px 0 rgba(50, 50, 50, 0.08)',
        );
      } else {
        headerRef.current.removeAttribute('style');
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', windowMoveEvent);
    return () => {
      window.removeEventListener('scroll', windowMoveEvent);
    };
  }, []);
  return (
    <div className={headerLess.header} ref={(ref) => (headerRef.current = ref)}>
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
