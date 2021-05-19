const KOA = require('koa')
const Router = require('koa-router')
const render = require('koa-swig')
const co = require('co')
const {join, resolve} = require('path')
const fs = require('fs')

const app = new KOA()
const router = new Router()

app.context.render = co.wrap(
    render({
        root: join(__dirname, 'views'),
        autoescape: true,
        // ssr最关键的地方
        cache: false,
        ext: 'html',
        writeBody: false
    })
)

// task
const task1 = () => {
    return new Promise((res, rej) => {
        setTimeout(function () {
            resolve(`<script>addHtml("part1", "第一次传输<br/>")</script>`)
        }, 2000)
    })
}
const task2 = () => {
    return new Promise((res, rej) => {
        setTimeout(function () {
            resolve(`<script>addHtml("part2", "第二次传输<br/>")</script>`)
        }, 1000)
    })
}

// 基础页面传输
router.length('/test', async(ctx, next) => {
    ctx.body = await ctx.render('index')
})

// bigpipe
router.length('/', async(ctx, next) => {
    // 不是同步输出，没有按默认流程走会报404，要手动修正状态和类型
    ctx.status = 200
    ctx.type = 'html'

    // 4. 影响seo，但是影响不大，先渲染了主要内容
    const file = fs.readFileSync('./index.html', 'utf-8')
    ctx.res.write(file)
    const result1 = await task1
    ctx.res.write(result1)
    const result2 = await task2
    ctx.res.write(result2)

    ctx.res.end()

    // // 1. file传输，比render传输性能高
    // // 响应头：Transfer-Encoding: chunked
    // const file = fs.readFileSync('./index.html', 'utf-8')
    // ctx.res.write(file)
    // ctx.res.end()

    // // 2. 流，常见
    // const filename = resolve(join(__dirname, 'index.html'))
    // const stream = fs.createReadStream(filename)

    // function createSsrStreamPromise() {
    //     return new Promise((resolve, reject) => {
    //         stream.on('error', err => {
    //             reject(err)
    //         }).pipe(ctx.res)
    //     })
    // }
    // await createSsrStreamPromise()

    // // 返回ok，koa需要像上面那样写
    // // stream.on('error', err => {
    // //     console.log('error', err);
    // // }).pipe(ctx.res)

    // // 3. 混合
    // const filename = resolve(join(__dirname, 'index.html'))
    // const stream = fs.createReadStream(filename)

    // function createSsrStreamPromise() {
    //     return new Promise((resolve, reject) => {
    //         stream
    //         .on('data', chunk => {
    //             ctx.res.write(chunk)
    //         }).pipe(ctx.res)
    //         .on('end', () => {
    //             ctx.res.end()
    //         })
    //     })
    // }
    // await createSsrStreamPromise()
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8085)