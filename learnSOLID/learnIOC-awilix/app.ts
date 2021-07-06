// module-alias

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
        // 不能用单例，数据会共享
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