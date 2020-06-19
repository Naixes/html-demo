import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  // 代理
  "proxy": {
    "/api": {
      "target": "https://pvp.qq.com",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
});
