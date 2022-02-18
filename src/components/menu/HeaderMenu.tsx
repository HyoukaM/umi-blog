import React from 'react';
import { IConfigFromPluginsRoutes, routes } from '@/routes/routes';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

const filterRouter = routes?.filter((router) => router.path === '/')[0].routes;

const HeaderMenu = () => {
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
  return <Menu mode="horizontal">{renderMenu(filterRouter)}</Menu>;
};

export default HeaderMenu;
