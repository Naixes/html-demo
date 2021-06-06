## ts实战

### 01 注入

安装ts`npm i -g typescript`

esprima：给js生成ast树，其中使用到了estree库

安装yarn`node install -g yarn`

ioc

元编程`yarn add reflect-metadata`，增强反射

### 02

webpack环境

Loader

#### swc-loader配置

babel-loader麻烦，swc-loader：激进一些，对底层进行重写了，不是使用js构建，使用的rust构建，直接编译成机器码，快一些

`npm i --save-dev @swc/core swc-loader`

*配置见代码提交记录*

#### babel-loader配置

js`npm install -D babel-loader @babel/core @babel/preset-env`

ts`npm i -D @babel/preset-typescript`

*配置见代码提交记录*

> eslint，eslint-config-airbnb-typescript