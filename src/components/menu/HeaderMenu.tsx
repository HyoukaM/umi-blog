import React, { useState, useEffect } from 'react';
import { IConfigFromPluginsRoutes, routes } from '@/routes/routes';
import { Menu } from 'antd';
import { useHistory } from 'umi';

const { SubMenu, Item } = Menu;

const filterRouter = routes?.filter((router) => router.path === '/')[0].routes;

const HeaderMenu: React.FC = () => {
  const [subMenuActivePath, setSubMenuActivePath] = useState<string>('/');
  const history = useHistory();
  if (!filterRouter || !filterRouter.length) return null;
  const renderMenu = (routes: IConfigFromPluginsRoutes) => {
    return routes.map((router) => {
      const icon = router.icon;
      if (router.routes && router.routes.length) {
        return (
          <SubMenu key={router.component as string} title={router.title}>
            {renderMenu(router.routes)}
          </SubMenu>
        );
      }
      return <Item key={router.path}>{router.title}</Item>;
    });
  };
  const menuSelect = ({ key }: { key: string }) => {
    history.push(key);
    setSubMenuActivePath(key);
  };

  useEffect(() => {
    setSubMenuActivePath(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <Menu
      selectedKeys={[subMenuActivePath]}
      onSelect={menuSelect}
      mode="horizontal"
    >
      {renderMenu(filterRouter)}
    </Menu>
  );
};

export default HeaderMenu;
