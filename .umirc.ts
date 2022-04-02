import { defineConfig } from 'umi';
import { routes } from './src/routes/routes';

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/app/' : '/',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  favicon:
    'https://cdn.jsdelivr.net/gh/HyoukaM/umi-blog/src/assets/favicon.svg',
  alias: {
    '@/cloud': './src/cloudbase-api',
  },
  dva: {
    immer: true,
    hmr: true,
    disableModelsReExport: false,
    lazyLoad: true,
  },
  antd: {
    compact: true,
  },
  history: {
    type: 'hash',
  },
  scripts: ['https://pv.sohu.com/cityjson?ie=utf-8'],
});
