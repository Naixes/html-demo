npm i awilix awilix-koa -D

> ts-node-dev，不用每次重启，ts版的nodemon
>
> modules-alias

router不需要手动写，@route

```js
import { GET, route } from "awilix-koa";
import { Context } from "../interfaces/IKoa";

@route('/')
class IndexController {
    @route('/')
    @GET()
    async actionIndex(ctx: Context): Promise<void> {
        // ctx.body = {
        //     data: 'hello'
        // }
        ctx.body = await ctx.render('index')
    }
}

export default IndexController
```

ioc自动注入

```js
import { GET, route } from "awilix-koa";
import { IApi } from "../interfaces/IApi";
import { Context } from "../interfaces/IKoa";

@route('/api')
class ApiController {
    private apiService: IApi
    // AOP(面向切面编程)
    // :解构，:类型
    // awilix自动注入
    constructor({apiService}: {apiService: IApi}) {
        // 私有化
        this.apiService = apiService
    }
    @route('/list')
    @GET()
    async actionList(ctx: Context): Promise<void> {
        const data = await this.apiService.getInfo()
        ctx.body = {
            data
        }
    }
}

export default ApiController
```

配置

```js
// 没有default，需要在tsconfig中配置
import KOA from 'koa'
// 创建容器，容器中的内容有生命周期
import {createContainer, Lifetime} from 'awilix'
// 使用时才开始创建
import {scopePerRequest, loadControllers} from 'awilix-koa'
import co from 'co'
import render from 'koa-swig'

const app = new KOA()

// 配置swig参数
app.context.render = co.wrap(render({
    // 模版路径
    root: './views',
    // 线上开启
    cache: false, // disable, set to false
    // 必须
    writeBody: false,
    ext: 'html'
}))

const container = createContainer()
// 往容器里注入service
container.loadModules([`${__dirname}/services/*.ts`], {
    formatName: "camelCase",
    resolverOptions: {
        // 设置生命周期，有三种：用完销毁，单例，每次都new
        // 每次都new
        lifetime: Lifetime.SCOPED
    }
})

// 每次请求时的生命周期，从container中找
app.use(scopePerRequest(container))
// 加载路由
app.use(loadControllers(`${__dirname}/services/*.ts`))

app.listen(3000, () => {
    console.log('naixes bff start success');
})
```

