const Router = require('koa-router')
const path = require('path')
const common = require('./common')

module.exports = function(table, list_type, fields) {
	// 每次执行都有一个新的router
	let router = new Router()

	// 类目管理字段
	const list_types = {
		'banner': 'banner管理',
		'catalog': '类目管理',
		'artical': '文章管理',
	}

	// 渲染列表
	router.get('/', async ctx => {
			const {HTTP_ROOT} = ctx.config
			// 数据库查询也是异步操作
			let data = await ctx.db.query(`SELECT * FROM ${table}`)
			await ctx.render('admin/table', {
					fields,
					datas: data,
					HTTP_ROOT,
					list_type,
					list_types
			})
	})

	// 添加
	router.post('/', async ctx => {
		const {HTTP_ROOT} = ctx.config
		let {title, src, href, serial} = ctx.request.fields

		// 动态获取上传字段
		let keys = []
		let values = []

		fields.forEach(field => {
			const {name, type} = field
			keys.push(name)
			
			// 判断不同的字段类型
			if(type === 'file') {
				values.push(path.basename(ctx.request.fields[name][0].path))
			}else {
				values.push(ctx.request.fields[name])
			}
		})
		await ctx.db.query(`INSERT INTO ${table} (${keys.join(',')}) VALUES(${keys.map(key=>'?').join(',')})`, values)
		// 重新渲染列表
		ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
	})

	// 查看
	router.get('/get/:id', async ctx => {
		let {id} = ctx.params
		let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
		if(data.length === 0) {
			ctx.body = {err: 1, msg: 'no data'}
		}else {
			ctx.body = {err: 0, msg: 'success', data: data[0]}
		}
	})

	// 修改
	router.post('/modify/:id', async ctx => {
		const {UPLOAD_DIR, HTTP_ROOT} = ctx.config
		const {id} = ctx.params

		// 获取参数
		let post = ctx.request.fields
		
		// 获取旧的上传文件
		let old_data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
		ctx.assert(old_data, 400, 'no data')

		// 获取上传字段
		let keys = []
		let values = []
		// 旧的上传文件src
		let srcs = {}
		// src是否改变
		let src_changes = {}
		fields.forEach(field => {
			const {name, type} = field
			// 判断字段类型
			if(type === 'file') {
				// 判断是否上传文件
				// 不同的库可能会有不同的文件信息
				if(post[name] && post[name].length && post[name][0].size) {
					keys.push(name)
					values.push(path.basename(post[name][0].path))
					src_changes[name] = true
				}
				srcs[name] = old_data[0][name]
			}else {
				values.push(post[name])
				keys.push(name)
			}
		})

		// console.log(`UPDATE ${table} SET ${keys.map(key => `${key}=?`).join(',')} WHERE ID=?`)
		// console.log([...values, id])
		// 更新数据库
		await ctx.db.query(`UPDATE ${table} SET ${keys.map(key => `${key}=?`).join(',')} WHERE ID=?`, [...values, id])

		// 删除上传文件
		fields.forEach(async field => {
			const {name, type} = field
			if(type === 'file' && src_changes[name]) {
				let old_src = old_data[0][name]
				await common.unlink(path.resolve(UPLOAD_DIR, old_src))
			}
		})

		// 重新渲染列表
		ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
	})

	// 删除
	router.get('/delete/:id', async ctx => {
		const {UPLOAD_DIR, HTTP_ROOT} = ctx.config
		let {id} = ctx.params

		// 获取旧的上传文件
		let old_data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id])
		ctx.assert(old_data, 400, 'no data')
		
		// 删除上传文件
		fields.forEach(async field => {
			const {name, type} = field
			if(type === 'file') {
				let old_src = old_data[0][name]
				await common.unlink(path.resolve(UPLOAD_DIR, old_src))
			}
		})

		// 删除数据
		await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id])

		ctx.redirect(`${HTTP_ROOT}/admin/${list_type}`)
	})

	return router.routes()
}
