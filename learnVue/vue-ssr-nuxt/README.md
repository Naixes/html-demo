`npx create-nuxt-app vue-ssr-nuxt`

不推荐选择服务端框架，aiox 是经过封装的

<img src="note.assets/截屏2021-05-11 下午4.59.53.png" alt="截屏2021-05-11 下午4.59.53" style="zoom:50%;" />

路由

<nuxt> -- <router-view>

<nuxt-link> -- <router-link>

异步数据

已经集成了 axios，直接在 asyncData 的参数中读取$axios，参考https://axios.nuxtjs.org/helpers

在 plugins 中设置拦截器，options 可以在 nuxt.config.js 中配置

```js
// aixos.js
// axios已内置
// 拦截器
export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    if (error.response.status === 500) {
      redirect('/sorry')
    }
  })
}
```

也可以自己手动在 plugins/axios.js 中集成 axios

发送请求两种方法：$axios 或者 store

```vue
<template>...</template>

<script>
import ErrorHandle from '~/plugins/axios'
export default {
  // store有配置时才可以使用
  asyncData({ $axios, store }) {
    ErrorHandle($axios, redirect)
  },
}
</script>
```

store

```js
export const state = () => ({
  counter: 0,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
}
```

> json-server

#### universal mode

spa 慢

universal mode：混合 spa

如果应用已经初始化混合化，会表现的像 spa 应用

链接预取：不会在一开始加载所有链接，在页面显示链接时才会加载链接

#### auth 模块

参考：https://auth.nuxtjs.org/guide/setup

middleware，控制页面是否使用鉴权

schemes，鉴权策略，在 nuxt.config.js 中，会读取 nuxtjs 的默认配置，一般使用 local

```bash
yarn add --exact @nuxtjs/auth-next
yarn add @nuxtjs/axios
```

内置了很多 api

`loginWith(strategyName, ...args)`

默认请求登录接口，配置见 local

Set current strategy to `strategyName` and attempt login. Usage varies by current strategy.

```js
this.$auth
  .loginWith('local', {
    data: {
      /* data to post to server */
    },
  })
  .then(() => this.$toast.success('Logged In!'))

this.$auth
  .loginWith('google', {
    params: {
      /* additional authentication parameters */
    },
  })
  .then(() => this.$toast.success('Logged In!'))
```

`logout(...args)`

清楚 session

- Returns: `Promise`

Logout active strategy. Usage varies by current scheme.

```js
await this.$auth.logout(/* .... */)
```

**local 配置示例**

Example for a token based flow:

```js
auth: {
  strategies: {
    local: {
      token: {
        property: 'token',
        // required: true,
        // type: 'Bearer'
      },
      user: {
        property: 'user',
        // autoFetch: true
      },
      endpoints: {
        // loginWith请求的接口
        login: { url: '/api/auth/login', method: 'post' },
        logout: { url: '/api/auth/logout', method: 'post' },
        // 登录后会默认请求的接口，user，loggedIn属性可以全局保存
        // propertyName，返回数据的字段
        user: { url: '/api/auth/user', method: 'get', propertyName: 'data' }
      }
    }
  }
}
```

Example for a cookie based flow:

```js
auth: {
  strategies: {
    local: {
      token: {
        required: false,
        type: false
      },
      endpoints: {
        login: { url: '/api/auth/login', method: 'post' },
      }
    }
  }
}
```

集成：

（查看文档的 api）

修改 server，axios，modules 等配置

```js
export default {
  ...
  server: {
    port: 8000, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxt.auth'
  ],
  axios: {
    baseURL: ''
  }
}
```

> linux 查看端口占用：lsof -i:8080
>
> kill -9 xxx
