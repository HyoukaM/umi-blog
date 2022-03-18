import React from 'react';
import { RoutesConfig } from '@/global/global';
import { PUB_CHILD_PATH, PUB_PATH } from '../global/database';

export type IConfigFromPluginsRoutes = RoutesConfig & {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
  notRender?: boolean;
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
        notRender: true,
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
      {
        path: `${PUB_CHILD_PATH}/links`,
        component: '@/pages/links/Links.tsx',
        exact: true,
        title: '友情链接',
      },
      {
        path: `${PUB_CHILD_PATH}/category`,
        component: '@/pages/category/Category.tsx',
        exact: true,
        title: '分类',
        notRender: true,
      },
    ],
  },
  {
    component: '@/pages/404/Error.tsx',
  },
];
