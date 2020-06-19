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
    // 把匹配前缀改成 /api/，这样最终发出的请求如果是 /api/ 将会使用代理，如果是 /apimock/ 将会使用mock 数据
    "/api/": {
      "target": "https://pvp.qq.com",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  }
});
