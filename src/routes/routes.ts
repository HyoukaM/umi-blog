import React from 'react';
import { RoutesConfig } from '@/global/global';
import { PUB_CHILD_PATH, PUB_PATH } from '../global/database';

export type IConfigFromPluginsRoutes = RoutesConfig & {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
};

export const routes: Array<IConfigFromPluginsRoutes> = [
  {
    path: PUB_PATH,
    component: '@/layouts/index.tsx',
    exact: false,
    title: '首页',
    routes: [
      {
        path: PUB_PATH,
        component: '@/pages/home/Home.tsx',
        exact: true,
        title: '首页',
      },
      {
        path: `${PUB_CHILD_PATH}/archive`,
        component: '@/pages/archive/Archive.tsx',
        exact: true,
        title: '归档',
      },
      {
        path: `${PUB_CHILD_PATH}/article`,
        component: '@/pages/article/Article.tsx',
        exact: true,
        title: '文章',
      },
      {
        path: `${PUB_CHILD_PATH}/good-article`,
        component: '@/pages/good-article/GoodArticle.tsx',
        exact: true,
        title: '好文推荐',
      },
    ],
  },
  {
    component: '@/pages/404/Error.tsx',
  },
];
