const table = require('../../lib/table')

// 通用配置
// 配置表, 配置路径, 表格列字段
module.exports = table('catalog_table', 'catalog', [
	{title: '标题', name: 'title', type: 'text'}
])
