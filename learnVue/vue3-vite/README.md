## 搭建

```cmd
# npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue

```

setup的两种写法

插件：volar需要禁用vetur

引入ts：

修改文件后缀，会直接编译，输出是js

编写tsconfig.json

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "jsx": "preserve",
    "moduleResolution": "node",

    // 如果使用节点时有问题配置下两行，import @ 时报错
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}

```

vite优化，不会直接报错

支持引入css模块，src/shims-vue.d.ts

```ts
declare module "*.css" {
    const classes: {[key: string]: string}
    export default classes
}

declare module "*.vue" {
    import {defineComponent, FunctionalComponent} from 'vue'
    const component: ReturnType<typeof defineComponent> | FunctionalComponent
    export default component
}
```

引入图片不需要loader，属于静态资源

## 基础

onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onUnmounted, onErrorCaptured, watch, watchEffect, reactive, computed, ref, defineProps, toRefs

provide&inject和expose&templateRef

集成官方模版：vue-ts

增加包：vue-tsc（一些ts检查）, typescript -D

## 封装

### 请求封装

suspense，异步组件

### 引入组件库

安装antd

### 增强vuex

### 封装HighCharts

基于highcharts