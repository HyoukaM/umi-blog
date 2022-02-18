import { defineConfig } from 'umi';
import { routes } from './src/routes/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  favicon: './src/assets/favicon.svg',
  alias: {
    '@/cloud': './src/cloudbase-api',
  },
  dva: {
    immer: true,
    hmr: true,
  },
  antd: {
    compact: true,
  },
});
