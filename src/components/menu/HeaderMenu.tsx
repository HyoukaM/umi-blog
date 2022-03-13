import React, { useState, useEffect } from 'react';
import { IConfigFromPluginsRoutes, routes } from '@/routes/routes';
import { Menu } from 'antd';
import { useHistory } from 'umi';
import { PUB_PATH } from '@/global/database';
import menuStyle from '@/style/components/menu.less';

const { SubMenu, Item } = Menu;

const filterRouter = routes?.filter((router) => router.path === PUB_PATH)[0]
  .routes;

const HeaderMenu: React.FC = () => {
  const [subMenuActivePath, setSubMenuActivePath] = useState<string>('/');
  const history = useHistory();
  if (!filterRouter || !filterRouter.length) {
    return null;
  }
  const renderMenu = (routes: Array<IConfigFromPluginsRoutes>) => {
    return routes.map((router: IConfigFromPluginsRoutes) => {
      if (router.routes && router.routes.length) {
        return (
          <div key={router.component as string}>
            {renderMenu(router.routes)}
          </div>
        );
      }
      return (
        <div
          onClick={() => menuSelect({ key: router.path ?? '' })}
          className={`${menuStyle.menuItem} ${
            subMenuActivePath === router.path ? menuStyle.menuItemActive : ''
          }`}
          key={router.path}
        >
          {router.title}
        </div>
      );
    });
  };
  const menuSelect = ({ key }: { key: string }) => {
    history.push(key);
    setSubMenuActivePath(key);
  };

  useEffect(() => {
    setSubMenuActivePath(history.location.pathname);
  }, [history.location.pathname]);

  return <div className={menuStyle.menu}>{renderMenu(filterRouter)}</div>;
};

export default HeaderMenu;
