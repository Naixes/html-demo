# electron

- 一个个性化浏览器
- 支持nodejs和浏览器js

### 开始

#### 安装

```js
npm init -y
npm i electron --dev
// 在本地目录寻找，不写就是在全局寻找
npx electron -v
```

安装报错：read ECONNRESET，无法翻墙导致

设置淘宝镜像：

```js
// 设置临时镜像
npm --registry https://registry.npm.taobao.org install express
// 设置永久镜像
npm config set registry https://registry.npm.taobao.org
// 单独设置某个包的镜像
npm config set electron_mirror https://npm.taobao.org/mirrors/electron/
```

创建index.html和main.js

#### 配置

添加脚本命令：`"start": "electron ."`

修改main：`"main": "main.js"`

编写main.js打开index.html

#### 打包

安装electron-builder

添加命令脚本，从github上面拷贝

```json

  "scripts": {
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
  "build": {
    "appId": "your.id",
    "mac": {
      "category": "your.app.category.type"
    }
  }
```

也可以直接打开一个网站，win.loadURL()

dist --win可以打包一个windows



移植vue项目，开一个服务，gitbash打开命令行，http-server打开一个服务
打包到根目录，将文件拖到electron项目中，打包

#### 缺点

功能不全面，安装包体积大，程序占用内存大，不能做大型游戏