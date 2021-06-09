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
    "moduleResolution": "node"
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
```

