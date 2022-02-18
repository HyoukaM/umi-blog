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
    exact: true,
    title: '首页',
    routes: [
      {
        path: '/home',
        component: '@/pages/home/Home.tsx',
        exact: true,
        title: '首页',
      },
      {
        path: '/test',
        component: '@/pages/home/Home.tsx',
        exact: true,
        title: '测试',
      },
    ],
  },
  {
    component: '@/pages/404/Error.tsx',
  },
];
