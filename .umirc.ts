import { defineConfig } from 'umi';
import { routes } from './src/routes/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  fastRefresh: {},
  favicon: 'public/favicon.svg',
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
});
