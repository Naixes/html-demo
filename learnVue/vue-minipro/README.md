# vue-minipro

## 登录页面：不需要公共的头部和脚部

方法1：可配置多入口（多个entry，多个HtmlWebpackPlugin），inject改为false（自动注入js），手动引入js（<script src="<%=src%>" charset="utf-8"></script>，HtmlWebpackPlugin添加src），不推荐：无论请求什么文件返回同一个html文件，配置麻烦

方法2：App中判断（利用路由），单独处理login

在行间样式中和动态生成的src不会被打包，图片可能显示不出来，写到class样式里或在js（html用require）中import引入

## 配置SERVER

在配置文件中判断，或在webpack中配置

引入SERVER，undefined时检查是否使用{}引入

```js
let server = ''
// 判断当前环境,也可以在webpack中配置??>
if(process.env.MODE_ENV == 'development') {
    server='http://localhost:8081/'
}else {
    server='http://xxx.com/'
}

export const SERVER = server 
```

## 配置跨域

## 所在地区

同时返回或分级返回

## Token

session依赖cookie受到跨域限制，token比较通用，多个有联系的项目可以一次登录（单点登录 ）

## 封装fetch

## 多级下拉
