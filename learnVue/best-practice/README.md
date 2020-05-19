### 创建项目

#### vue-cli 3

基于webpack构建，带有合理的默认配置，可通过项目内部文件配置，可通过插件扩展

- webpack相关配置，在根目录创建vue.config.js 

```js
// vue.config.js
const port = 7070;
const title = "vue项目最佳实践";
module.exports = {
    publicPath: '/best-practice', // 部署应用包时的基本 URL 应用程序上下文
    devServer: {
    	port: port,
    },
    configureWebpack: {
        // 向index.html注入标题
        name: title
	}
};

// index.html webpack提供的模板语法
<title><%= webpackConfig.name %></title>
```

> 注意：以上配置要求vue-cli-service版本>=3.5
> 通过命令查看配置结果：
>
> - vue inspect 全部配置
> - vue inspect --rules 查看全部规则
> - vue inspect --rule vue 查看指定规则
> - vue inspect --plugins 查看全部插件
> - vue inspect --plugin vue-plugin 查看指定插件 
> - vue inspect --mode development 指定模式
>
> 通过ui查看配置结果：
>
> - vue ui 可视化管理工具，可以查看完整的配置项

##### 高级链式操作

范例：项目使用icon，传统方案是图标字体（字体文件+样式文件），不方便维护，svg方案可以自动打包

使用icon前先安装依赖：svg-sprite-loader 

下载图标，存入src/icons/svg中，修改规则和新增规则

```js
// vue.config.js 
// resolve定义一个绝对路径获取函数
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
} 
//...
// 链式webpack配置
chainWebpack(config) {
    // 默认配置会对svg做一定的处理，有冲突，所以首先要在默认配置中排除对icon/svg文件的处理
    // 配置svg规则排除icons目录中svg文件处理
    config.module
        .rule("svg")
        .exclude.add(resolve("src/icons"))
    	// 回退到上一个步骤
        .end();
    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    config.module
        .rule("icons")
        .test(/\.svg$/)
        .include.add(resolve("src/icons"))
        .end()
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
    	// 图标的使用规则
        .options({ symbolId: "icon-[name]" })
        .end();
}
```

```js
// 图标自动导入
// icons/index.js
// 获取加载函数
// 参数：上下文，是否检索子目录，加载规则，返回是一个函数
// 有id属性，keys，resolve等方法
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req);
// main.js
import './icons'
```

```vue
// icon组件
<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
    	<use :xlink:href="iconName" />
    </svg>
</template>
<script>
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
    	},
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
        	return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
} 
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
} 
</style>

// 注册组件
import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
Vue.component('svg-icon', SvgIcon)

// 使用组件
<svg-icon icon-class="qq"></svg-icon>
```

#### 权限控制

依赖element ui，js-cookie

`vue add element`安装完注意配置.babelrc或手动引入样式文件

`npm i js-cookie -S`

##### 动态路由

两种路由

- constRoutes：不需要动态判断和权限的路由，登录看板，404等页面
- asyncRoutes：需要判断权限并通过addRoute动态添加的页面

```js
import Vue from "vue";
import Router from "vue-router";
import Layout from '@/layout'; // 布局页

Vue.use(Router);

// 通用页面：这里的配置时不需要权限的
export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout,// 应用布局
    redirect: "/home",
    meta: {title: '首页', icon:'qq'},
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "home",
        meta: { 
            title: "Home", // 导航菜单项标题
            icon: "qq" // 导航菜单项图标
        }
      },
      {
        path: "mua",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
        name: "mua",
        meta: { 
            title: "波一个", // 导航菜单项标题
            icon: "wx" // 导航菜单项图标
        }
      }
    ]
  }
];

// 权限页面
export const asyncRoutes = [
    {
      path: "/about",
      component: Layout,
      redirect: "/about/index",  
     
      children: [
        {
          path: "index",
          component: () =>
            import(/* webpackChunkName: "home" */ "@/views/About.vue"),
          name: "about",
          meta: { 
              title: "About", 
              icon: "qq",
              roles: ['editor']
          },
        },
        {
          path: "bla",
          component: () =>
            import(/* webpackChunkName: "home" */ "@/views/About.vue"),
          name: "bla",
          meta: { 
              title: "About", 
              icon: "qq",
              roles: ['admin']
          },
        },
      ]
    }
  ];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes
});
```

##### 路由守卫

```js
// 路由全局守卫
// 权限控制逻辑在这里
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 从cookie获取令牌

const whiteList = ['/login'] // 无需令牌白名单

router.beforeEach(async (to, from, next) => {

  // 获取令牌判断用户是否登录
  const hasToken = getToken()

//   有令牌说明已登录
  if (hasToken) {
    if (to.path === '/login') {
      // 若已登录重定向至首页
      next({ path: '/' })
    } else {
      // 若用户角色已附加则说明动态路由已添加
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next() // 继续即可
      } else {
        try {
          // 先请求获取用户信息
          const { roles } = await store.dispatch('user/getInfo')
          
          // 根据当前用户角色动态生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // 添加这些路由至路由器
          router.addRoutes(accessRoutes)

          // 继续路由切换，确保addRoutes完成
          next({ ...to, replace: true })
        } catch (error) {
          // 出错需重置令牌并重新登录（令牌过期、网络错误等原因）
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 用户无令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单路由放过
      next()
    } else {
      // 重定向至登录页
      next(`/login?redirect=${to.path}`)
    }
  }
})
```

##### 权限按钮

direction.permission.js

```js
import store from "@/store";

const permission = {
    // 指令已经添加到元素上，el-指令相关dom元素；binding-对象
    // binding: {name:'if', expression:'foo==1', value: true}
    // v-permission="['admin','editor']"
    inserted(el, binding) {
    // 获取指令的值：按钮要求的角色数组
    // 结构value并取别名pRoles
    const { value:pRoles } = binding;
    // 获取用户角色
    const roles = store.getters && store.getters.roles;

    if (pRoles && pRoles instanceof Array && pRoles.length > 0) {      
      // 判断用户角色中是否有按钮要求的角色
      const hasPermission = roles.some(role => {
        return pRoles.includes(role);
      });

      // 如果没有权限则删除当前dom
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`需要指定按钮要求角色数组，如v-permission="['admin','editor']"`);
    }
  }
};

export default permission;
```

也有必须使用v-if的场景

##### 总结

流程：

输入网址----全局守卫（判断cookie无token非白名单重定向到登录）----全局守卫（判断无token，白名单继续）----登录----action Login（登录，获取token并保存，获取用户信息等）----重定向首页----全局守卫（有token，判断无roles，设置roles和路由，重定向至本页）----全局守卫（有token，有roles继续访问）----首页

流程主要由全局守卫控制，vuex，cookie提供数据存储

可优化成：

输入网址----全局守卫（判断cookie无token非白名单重定向到登录）----全局守卫（判断无token，白名单继续）----登录----action Login（登录，获取token并保存，获取用户信息，设置roles和路由等）----重定向首页----全局守卫（有token，有roles继续访问）----首页

其他方案（hccpb）：

输入网址----created（判断cookie非白名单重定向至登录）-----created（判断cookie白名单重定向至登录注册全局守卫）----登录----获取用户信息设置cookie----action Login（保存用户信息和权限信息至vuex）----全局守卫（有token，有roles继续访问）----首页

#### 面包屑

```vue
<template>
  <!-- element-ui提供的面包屑组件 -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 不能跳转：路由没有配置重定向或当前项已经是最后一项 -->
        <span
          v-if="item.redirect==='noRedirect'||index==levelList.length-1"
          class="no-redirect"
        >{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    // 观察$route变化重新生成面包屑连接
    $route: {
      handler(route) {
        this.getBreadcrumb();
      },
      immediate: true
    }
  },

  methods: {
    getBreadcrumb() {
      console.log(this.$route.matched);

      // 面包屑仅显示包含meta.title且item.meta.breadcrumb不为false的路由
      // /about/bla
      // matched: [{path:'/'}, '/about', '/about/bla']
      let matched = this.$route.matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );

      // 根路由
      const first = matched[0];

      // 根匹配只要不是home，就作为home下一级
      if (!this.isHome(first)) {
        matched = [{ redirect: "/home", meta: { title: "首页" } }].concat(matched);
      }

      // 处理完指定到levelList
      this.levelList = matched
    },
    isHome(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim().toLocaleLowerCase() === "home".toLocaleLowerCase();
    },
    pathCompile(path) {
      // 把参数拿出来
      const { params } = this.$route;
      // 获取编译函数
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      // 若存在重定向，按重定向走
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      // 编译path，避免存在路径参数
      this.$router.push(this.pathCompile(path));
    }
  }
};
</script>

<style scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
.app-breadcrumb.el-breadcrumb .no-redirect {
  color: #97a8be;
  cursor: text;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all .5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all .5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
```

#### 数据交互

解决问题：

请求的统一处理

url自动变化

跨域问题

##### 封装request

```js
import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";

// 1. 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url基础地址，解决不同数据源url变化问题，VUE_APP_BASE_API配置文件配置
  // withCredentials: true, // 跨域时若要发送cookies需设置该选项
  timeout: 5000 // 超时
});

// 2. 请求拦截
service.interceptors.request.use(
  config => {
    // do something
    // 把令牌添加到了请求头中
    if (store.getters.token) {
      // 设置令牌请求头
      config.headers["X-Token"] = getToken();
    }
    return config;
  },
  error => {
    // 请求错误预处理
    //console.log(error) // for debug
    return Promise.reject(error);
  }
);

// 3. 响应拦截
service.interceptors.response.use(
  // 通过自定义code判定响应状态，也可以通过HTTP状态码判定
  response => {
    // 仅返回数据部分
    const res = response.data;

    // code不为1则判定为一个错误
    if (res.code !== 1) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000
      });

      // 假设：10008-非法令牌; 10012-其他客户端已登录; 10014-令牌过期;
      if (res.code === 10008 || res.code === 10012 || res.code === 10014) {
        // 重新登录
        MessageBox.confirm(
          "登录状态异常，请重新登录",
          "确认登录信息",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  error => {
    //console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

```

##### 数据mock

本地mock和线上esay-mock

- 本地mock 

修改vue.config.js，给devServer添加相关代码： 

```js
const bodyParser = require("body-parser");
module.exports = {
    devServer: {
        before: app => {
            // node服务器代码 基于express
            // bodyPaser用来解析post请求中的json数据
            app.use(bodyParser.json());
            app.use(
              bodyParser.urlencoded({
                extended: true
              })
            );
            //登录接口声明
            app.post("/dev-api/user/login", (req, res) => {
                const { username } = req.body;

                if (username === "admin" || username === "jerry") {
                    res.json({
                        code: 1,
                        data: username
                    });
                } else {
                    res.json({
                        code: 10204,
                        message: "用户名或密码错误"
                    });
                }
            });

            app.get("/dev-api/user/info", (req, res) => {
                // 从请求头中获取令牌
                // adfasdfkadf; ja;kdfj;akdfjakdsfj;akjdf; akjdf;kalsjf;ajf
                // 令牌头         令牌体                     哈希
                // 加密算法       用户信息；有效期          
                const roles = req.headers['x-token'] === "admin" ? ["admin"] : ["editor"];
                res.json({
                    code: 1,
                    data: roles
                });
            });
        }
    }
}
```

- esay-mock

使用步骤：

1. 登录easy-mock网站
2. 创建一个项目
3. 创建需要的接口
4. 调用：修改base_url，.env.development 

`VUE_APP_BASE_API = 'https://easy-mock.com/mock/5cdcc3fdde625c6ccadfd70c/kkb
cart' `

##### 跨域

如果请求的接口在另一台服务器上，开发时则需要设置代理避免跨域问题： 

#### 测试

##### 测试分类

常见的开发流程里，都有测试人员，他们不管内部实现机制，只看最外层的输入输出，这种我们称为黑盒测试。比如你写一个加法的页面，会设计N个用例，测试加法的正确性，这种测试我们称之为E2E测试。

更负责一些的我们称之为集成测试，就是集合多个测试过的单元一起测试。

还有一种测试叫做白盒测试，我们针对一些内部核心实现逻辑编写测试代码，称之为单元测试。

##### 单元测试

##### 测试Vue组件

官方库@vur/test-utils

##### 测试覆盖率

#### 部署