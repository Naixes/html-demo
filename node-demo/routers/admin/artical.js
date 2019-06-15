const table = require('../../lib/table')

// 通用配置
// 配置表, 配置路径, 表格列字段
module.exports = table('article_table', 'article', [
	  {title: '标题', name: 'title', type: 'text'},
	  {title: '类目', name: 'catalog_ID', type: 'select'/*, ?*/},
	  {title: '时间', name: 'created_time', type: 'date'},
	  {title: '作者', name: 'author', type: 'text'},
	  {title: '浏览', name: 'view', type: 'number'},
	  {title: '评论', name: 'comment', type: 'number'},
	  {title: '摘要', name: 'summary', type: 'text'},
	  {title: '列表图', name: 'list_img_src', type: 'file'},
	  {title: 'banner图', name: 'banner_img_src', type: 'file'},
	  {title: '内容', name: 'content', type: 'textarea'},
])
  