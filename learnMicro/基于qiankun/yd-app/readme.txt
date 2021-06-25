1.react-cli vue-cli 创建项目
2.vue项目 (源码 精神病 扒出来看看 api国内 examples)
vue-cli -》 vue.config.js
    ① configureWebpack umd的包
    ② 建环境变量 .env文件
    ③  'Access-Control-Allow-Origin': '*'
    ④ public-path.js 微前端内部 修改共有路径
    ⑤ main.js -> import './public-path';
    ⑥ 把qiankun全部的生命周期 丢到main.js 主应用
    ⑦ 一定要注意下组件的销毁逻辑 react 生命周期
    ⑧ getCurrentInstance 得到挂载全局实例
    ⑨ ctx.$setGlobalState({ name: "chaunjie" });
3.主应用
    ① loadMicroApp({
            name: 'sub-vue',
            entry: '//localhost:7777',
            container: '#app1',
        });
     ② initGlobalState
4.react
    ① webpack react-app-rewired
    ② hot-reload 手写 
    ③ WDS_SOCKET_PORT=7788
    ④ 万万注意public-path
    ⑤ LCP 代表了页面的速度指标， LCP 能体现的东西更多一些。一是指标实时更新，数据更精确，二是代表着页面最大元素的渲染时间，最大元素的快速载入能让用户感觉性能还挺好。
        FID 代表页面的交互体验指标，交互响应的快会让用户觉得网页流畅。
        CLS 代表了页面的稳定指标，尤其在手机上这个指标更为重要。因为手机屏幕挺小，CLS 值一大的话会让用户觉得页面体验做的很差。
    ⑥ react生命周期和挂载方法