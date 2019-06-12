const Router = require('koa-router')
const path = require('path')
const common = require('../../lib/common')

let router = new Router()


// 通用配置
// 配置表
const table = 'banner_table'

// 类目管理字段
const list_type = 'banner'
const list_types = {
	'banner': 'banner管理',
	'catalog': '类目管理',
	'artical': '文章管理',
}
// 表格列字段
const fields = [
    {title: '标题', name: 'title', type: 'text'},
    {title: '图片', name: 'src', type: 'file'},
    {title: '链接', name: 'href', type: 'text'},
    {title: '序号', name: 'serial', type: 'number'},
]


// 渲染列表
router.get('/', async ctx => {
    const {HTTP_ROOT} = ctx.config
    // 数据库查询也是异步操作
    let data = await ctx.db.query(`SELECT * FROM ${table}`)
    await ctx.render('admin/table', {
				type: 'view',
        fields,
        datas: data,
        HTTP_ROOT,
				list_type,
				list_types,
				action: `${HTTP_ROOT}/admin/${list_type}`
    })
})

// 添加
router.post('/', async ctx => {
	const {HTTP_ROOT} = ctx.config
	let {title, src, href, serial} = ctx.request.fields
	// 获取上传的文件名
	src = path.basename(src[0].path)
	await ctx.db.query(`INSERT INTO ${table} (title, src, href, serial) VALUES(?, ?, ?, ?)`, [title, src, href, serial])
	ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
})

// 获取特定
router.get('/modify/:id', async ctx => {
	const {HTTP_ROOT} = ctx.config
	let {id} = ctx.params
	let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
	ctx.assert(data.length, 400, 'no data')
	let old_data = data[0]
	await ctx.render('admin/table', {
		type: 'modify',
		old_data,
		fields,
		HTTP_ROOT,
		action: `${HTTP_ROOT}/admin/${list_type}/modify/${id}`
	})
})

// 修改
router.post('/modify/:id', async ctx => {
	const {UPLOAD_DIR, HTTP_ROOT} = ctx.config
	const {id} = ctx.params

	// 获取参数
	let post = ctx.request.fields
	
	// 获取旧的上传文件
	let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
	// console.log(data)
	ctx.assert(data, 400, 'no data')

	// 处理普通字段
	let keys = ['title', 'href', 'serial']
	let values = []
	keys.forEach(key => {
		values.push(post[key])
	})

	// 处理文件
	let src_change = false
	// 判断是否更新文件
	// 不同的库可能会有不同的文件信息
	if(post.src && post.src.length && post.src[0].size) {
		src_change = true
	}
	if(src_change) {
		keys.push('src')
		values.push(path.basename(post.src[0].path))
	}

	// 更新数据库
	await ctx.db.query(`UPDATE ${table} SET ${keys.map(key => `${key}=?`).join(',')} WHERE ID=?`, [...values, id])

	// 删除上传文件
	if(src_change) {
		let old_src = data[0].src
		await common.unlink(path.resolve(UPLOAD_DIR, old_src))
	}

	ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
})

// 删除
router.get('/delete/:id', async ctx => {
	const {UPLOAD_DIR, HTTP_ROOT} = ctx.config
	let {id} = ctx.params

	// 获取旧的上传文件
	let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
	ctx.assert(data, 400, 'no data')
	
	// 删除上传文件
	await common.unlink(path.resolve(UPLOAD_DIR, data[0].src))

	// 删除数据
	await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id])

	ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
})

module.exports = router.routes()