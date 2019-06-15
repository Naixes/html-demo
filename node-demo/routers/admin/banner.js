const table = require('../../lib/table')

// 通用配置
// 配置表, 配置路径, 表格列字段
module.exports = table('banner_table', 'banner', [
	{title: '标题', name: 'title', type: 'text'},
	{title: '图片', name: 'src', type: 'file'},
	{title: '链接', name: 'href', type: 'text'},
	{title: '序号', name: 'serial', type: 'number'},
])