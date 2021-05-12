vue 官方服务端渲染方案

**通用代码编写注意：**

- 每个请求应该都是全新的、独立的应用程序实例，以便不会有交叉请求造成的状态污染 (cross-request state pollution)。

- 由于没有动态更新，所有的生命周期钩子函数中，只有 `beforeCreate` 和 `created` 会在服务器端渲染 (SSR) 过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 `beforeMount` 或 `mounted`），只会在客户端执行。 此外还需要注意的是，你应该避免在 `beforeCreate` 和 `created` 生命周期时产生全局副作用的代码，请将副作用代码移动到 `beforeMount` 或 `mounted` 生命周期中。
- 通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 `window` 或 `document`，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。
- 大多数自定义指令直接操作 DOM，因此会在服务器端渲染 (SSR) 过程中导致错误。有两种方法可以解决这个问题：
  1. 推荐使用组件作为抽象机制，并运行在「虚拟 DOM 层级(Virtual-DOM level)」（例如，使用渲染函数(render function)）。
  2. 如果你有一个自定义指令，但是不是很容易替换为组件，则可以在创建服务器 renderer 时，使用 [`directives`](https://ssr.vuejs.org/zh/api/#directives) 选项所提供"服务器端版本(server-side version)"。

**构建：**

![架构](note.assets/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

**使用 webpack 的源码结构：**

一个基本项目可能像是这样：

```bash
src
├── components
│   ├── Foo.vue
│   ├── Bar.vue
│   └── Baz.vue
├── App.vue
├── app.js # 通用 entry(universal entry)
├── entry-client.js # 仅运行于浏览器
└── entry-server.js # 仅运行于服务器
```

#### 实践

参考文档：https://ssr.vuejs.org/zh/

参考项目：https://github.com/Naixes/demo-collection/tree/master/learnVue/vue-ssr

安装：`npm install vue vue-server-renderer --save`

热加载配置

chokidar 库监控 template 文件改变

watch 结合 memory-fs 监控服务端入口文件的变化并保存到内存中

webpack-dev-middleware 结合 webpack-hot-middleware 监控浏览器端代码的热更新

路由和代码分割

配置组件动态加载，`npm install --save-dev @babel/plugin-syntax-dynamic-import`

数据预取和状态
