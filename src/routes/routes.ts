import React from 'react';
import { IConfigFromPlugins } from '@@/core/pluginConfig';

export type IConfigFromPluginsRoutes = IConfigFromPlugins['routes'] & {
  icon?: string | React.ReactNode;
  title?: string | React.ReactNode;
};

export const routes: IConfigFromPluginsRoutes = [
  {
    path: '/',
    component: '@/layouts/Layouts.tsx',
    exact: false,
    title: '首页',
    routes: [
      {
        path: '/',
        component: '@/pages/home/Home.tsx',
        exact: true,
        title: '首页',
      },
      {
        path: '/archive',
        component: '@/pages/archive/Archive.tsx',
        exact: true,
        title: '归档',
      },
      {
        path: '/article',
        component: '@/pages/article/Article.tsx',
        exact: true,
        title: '文章',
      },
    ],
  },
  {
    component: '@/pages/404/Error.tsx',
  },
];
