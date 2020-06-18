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

