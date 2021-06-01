**技术栈：**webpack5+vue3+vue-router+@vue/server-renderer

### 优点

SEO好，也可以用预渲染或无头浏览器解决

更快的内容到达时间

### 权衡

SSR：

SEO好

更快的内容到达时间

开发条件受限，dom，window，生命周期

配置复杂

服务器端负载大一些

可见不一定可操作

CSR：

SEO不好

白屏

可见可操作

页面切换流畅，js操作，减少与服务器交互

SSR首屏+CSR

### 渲染

Unlike a client-only Vue application, which is created using `createApp`, an SSR application needs to be created using `createSSRApp`:

```js
const { createSSRApp } = require('vue')

const app = createSSRApp({
  data() {
    return {
      user: 'John Doe'
    }
  },
  template: `<div>Current user is: {{ user }}</div>`
})
```

Now, we can use the `renderToString` function to render our application instance to a string. This function returns a Promise which resolves to the rendered HTML.

```js
const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')

const app = createSSRApp({
  data() {
    return {
      user: 'John Doe'
    }
  },
  template: `<div>Current user is: {{ user }}</div>`
})

const appContent = await renderToString(app)
```

express

```js
// server.js

const { createSSRApp } = require('vue')
const { renderToString } = require('@vue/server-renderer')
const server = require('express')()

server.get('*', async (req, res) => {
  const app = createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })

  const appContent = await renderToString(app)
  const html = `
  <html>
    <body>
      <h1>My First Heading</h1>
      <div id="app">${appContent}</div>
    </body>
  </html>
  `

  res.end(html)
})

server.listen(8080)
```

### 生命周期

Since there are no dynamic updates, the only [lifecycle hooks](https://v3.vuejs.org/guide/instance.html#lifecycle-hooks) that will be called during SSR are `beforeCreate` and `created`. This means any code inside other lifecycle hooks such as `beforeMount` or `mounted` will only be executed on the client.

Another thing to note is that you should avoid code that produces global side effects in `beforeCreate` and `created`, for example setting up timers with `setInterval`. In client-side only code we may setup a timer and then tear it down in `beforeUnmount` or `unmounted`. However, because the destroy hooks will not be called during SSR, the timers will stay around forever. To avoid this, move your side-effect code into `beforeMount` or `mounted` instead.

### 避免状态单例

When writing client-only code, we can assume that our code will be evaluated in a fresh context every time. However, a Node.js server is a long-running process. When our code is first imported by the process, it will be evaluated once and then stay in memory. This means that if you create a singleton object, it will be shared between every incoming request, with the risk of cross-request state pollution.

Therefore, we need to **create a new root Vue instance for each request.** In order to do that, we need to write a factory function that can be repeatedly executed to create fresh app instances for each request:

```js
// app.js
const { createSSRApp } = require('vue')

function createApp() {
  return createSSRApp({
    data() {
      return {
        user: 'John Doe'
      }
    },
    template: `<div>Current user is: {{ user }}</div>`
  })
}
```

And our server code now becomes:

```js
// server.js
const { renderToString } = require('@vue/server-renderer')
const server = require('express')()
const { createApp } = require('src/app.js')

server.get('*', async (req, res) => {
  const app = createApp()

  const appContent = await renderToString(app)
  const html = `
  <html>
    <body>
      <h1>My First Heading</h1>
      <div id="app">${appContent}</div>
    </body>
  </html>
  `

  res.end(html)
})

server.listen(8080)
```

### 构建

单独入口

<img src="README.assets/截屏2021-06-01 上午9.11.53.png" alt="截屏2021-06-01 上午9.11.53" style="zoom:70%;" />

### 客户端搭建

#### vuex

#### vue-router

### webpack配置

安装：

webpack webpack-cli webpack-merge webpack-node-externals

vue-loader@next vue@next

babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime

css-loader mini-css-extract-plugin

loader：

- vue-loader
- css-loader
- css提取

plugin：

- html-webpack-plugin

entry

output

devServer：

- webpack serve（webpack5）

### 服务器搭建

安装：koa koa-static @koa/router @vue/server-renderer

koa

router

static

### ssr处理

路由处理

请求处理（首屏请求）数据预获取

- 注水，脱水

客户端激活：所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。