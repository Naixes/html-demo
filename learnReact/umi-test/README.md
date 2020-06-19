













## Dva

### Model

在 umi 项目中，你可以使用 dva 来处理数据流，以响应一些复杂的交互操作。这些处理数据流的文件统一放在 models 文件夹下，每一个文件默认导出一个对象，里面包含数据和处理数据的方法，通常我们称之为 model 。一个 model 文件的结构一般是这样的：

```
export default {
  namespace: 'example', // 这个 model 的名字，必须全局唯一
  state: {
    count: 0,
  }, // 初始数据
  reducers: {
    save() { ... },
  }, // 用于修改数据
  effects: {
    *getData() { ... },
  }, // 用于获取数据
  subscriptions: {
    setup() { ... },
  }, // 用于订阅数据
}
```

### Reducer

每一个 [reducer](https://dvajs.com/guide/concepts.html#reducer) 都是一个普通函数，接受 state 和 action 作为参数，即：`(state, action) => state` ，你可以在函数中更改旧的 state，返回新的 state 。

```
reducers: {
  save(state, { payload }) {
    return ({ ...state, ...payload });
  },
},
```

### Effect

每一个 [effect](https://dvajs.com/guide/concepts.html#effect) 都是一个 [生成器函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) ，你可以在这里获取你需要的数据，例如向服务器发起一个请求、或是获取其他 model 里的 state 。为了明确分工，你无法在 effect 中直接修改 state ，但你可以通过 [put 方法](https://www.yuque.com/hele/react/nwb3ff#put) 调用 reducer 来修改 state 。

```
state:{
  assets:{},
},
*changeAssets({ payload }, { call, put, select }) {
  const user = yield select(states => states.user);
  const assets = yield call(fetchData, user);
  yield put({ type: 'save', payload: { assets } });
},
```

#### select

此方法用于获取当前或其他 model 的 state 。

```
const data = yield select(states => states[namespace]);
```

#### call

此方法用于执行一个异步函数，可以理解为等待这个函数执行结束。项目中常用于发送 http 请求，等待服务端响应数据。

```
const data = yield call(doSomethingFunc, parameter);
```

#### put

此方法用于触发一个 action，这个 action 既可以是一个 reducer 也可以是一个 effect 。

```
yield put({ type: 'reducerName', payload: { page } });
```

### Subscription

[subscription](https://dvajs.com/guide/concepts.html#subscription) 用于订阅一个数据源，根据需要使用 dispatch 触发相应的 action。数据源可以是当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。 项目中常用于页面初始化数据的自动请求，如：

```
subscriptions: {
  setup({ dispatch, history }) {
    return history.listen(({ pathname, query }) => {
      // 进入 '/home' 路由，发起一个名叫 'query' 的 effect
      if (pathname === '/home') {
        dispatch({ type: 'query' });
      }
    });
  },
},
```

(model,page和其他)

### dispatch

类似 effect 中的 [put 方法](https://www.yuque.com/hele/react/nwb3ff#put)，你可以在 subscription 的参数、或是一个已经 connect 过的组件的 `props` 中拿到。

### connect

通过此方法在你的组件中获取到指定 model 的 state 数据。

**示例**：

```
import { connect } from 'dva';
function App({ user, dispatch }) {
  const handleClick = () => {
    dispatch({ type: 'user/fetchUser' });
  };
  return (
    <div>
      <h2>Hello, {user}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
export default connect(({ user }) => ({ user }))(App);
```

以上内容，做了一些简化描述。 相关概念，参阅[官方文档](http://www.umijs.org/)。

## 初始化项目

### 第一步 使用 yarn 初始化项目

```
$ yarn global add @umijs/create-umi-app
```

@umijs/create-umi-app 主要是用来使用命令行创建 umi 相关的库或者项目。命令中打印 success 说明安装成功，如果你还需要进一步确认，可以执行 `create-umi-app -v` 来查看 @umijs/create-umi-app 的版本号。

### 第二步 使用 create-umi-app 新建项目

先找个地方建个空目录

```
$ mkdir myapp && cd myapp
```

```
$ create-umi-app
```

如果你的命令行打印的日志如上，说明新建项目完成了，如果有其他的错误，可以确认一下当前目录下是否为空。

以上两部也可以合并成一步，在一个空文件夹下面，执行 `yarn create @umijs/umi-app`

### 第三步 安装依赖

```
$ yarn 
```

看到命令行打印 success，一般就是安装成功了，但是有时候因为一些网络问题，会出现丢包的情况，需要你重新运行 `yarn` 验证是否全部安装成功。

### 第四步 启动开发服务器

```
$ yarn start
```

你可以通过浏览器访问 http://localhost:8000/ 来查看页面

## 项目结构

### mock

约定 mock 目录里所有的 `.js` 文件会被解析为 mock 文件。比如，新建 `mock/users.js`，内容如下：

```
export default {
  '/api/users': ['a', 'b'],
}
```

然后在浏览器里访问 http://localhost:8000/api/users 就可以看到 `['a', 'b']` 了。

> 注意请求地址和mock里面的文件名无关，只和文件内部的定义相关。你可以取任意的命名，但为了更好的维护项目，你应该取一些语意化更好的名字

### src/layouts/index.js

约定式的[全局布局](https://www.yuque.com/umijs/umi/layouts)，实际上是在路由外面套了一层。

**注意：要注释掉.umirc.ts中的路由否则，约定路由不起作用**

## 使用 dva

在 umi@3 中要使用 dva 的功能很简单，只要使用安装 `@umijs/plugin-dva` 并在 配置文件中开启 `dva` 配置。

```
yarn add @umijs/plugin-dva
```

> 如果提示 dva 不是约定的配置，说明你没有装 @umijs/plugin-dva ，如果你 dva 没有生效，可能是你配置没开启

教程在前面[使用 create-umi-app 初始化项目](https://www.yuque.com/umijs/umi/createumi#15de1c17)时，依赖了 `@umijs/preset-react` ，这是一个插件集，你无需再而外安装 plugin-dva ，只需要再配置中开启即可。打开 umi 的配置文件：

### ./umirc.js

```
import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  antd: {}
});
```

### 新增 model 文件

umi 中启用 dva 时，约定 `./src/models/` 目录下的  model 文件将被视为 model 模块 ，可以在页面中使用。

> 这里的 model 模块不仅仅是指 dva model 还有可能是 useModel 的模块。umi会自己判断，这里我们先新建dva的模块就好。

## 监听路由事件

一个很常见的需求，我们需要在进入页面的时候，发起请求页面初始化数据。这里我们通过 dva model 的 subscriptions 实现。

## http 请求 umi-request

在 umi 项目中并没有规定一定要使用某种 http 请求方式，我们可以根据实际项目，选择自己最熟悉和服务端交互最优的 http 请求方式，一般项目中我们比较常用的就是 fetch 和 axios ，这两者的优缺点比较，可以查阅其他资料，但是无论你选择哪一种，在你需要更换成另一种时，只需要修改几行代码，因为它们在使用上，只有一点点参数结构的差异。

> preset-react 中内置了 plugin-request 插件，这里我们直接使用。

## 配置 proxy

要在 umi 中使用 proxy 非常简单，只要在配置文件中配置就可以了。

./.umirc.js

```
export default {
  plugins: [
    ...
  ],
  "proxy": {
    "/api": {                                       ---step1
      "target": "https://pvp.qq.com", ---step2
      "changeOrigin": true,                         ---step3
      "pathRewrite": { "^/api" : "" }               ---step4
    }
  }
}
```

> 注意层级，proxy在最外层，不要写到插件plugins里面

- step1 设置了需要代理的请求头，比如这里定义了 `/api` ，当你访问如 `/api/abc` 这样子的请求，就会触发代理

- step2 设置代理的目标，即真实的服务器地址

- changeOrigin 设置是否跨域请求资源
- pathRewrite 表示是否重写请求地址，比如这里的配置，就是把 `/api` 替换成空字符