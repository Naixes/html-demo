// router统一处理：返回处理函数
let router = {
	// 'get': {
	// 	'url': function() {},
	// 	...
	// }
}

// 添加路由
function addRouter(method, url, fn) {
	method = method.toLowerCase()
	url = url.toLowerCase()
	router[method] = router[method] || {}
	router[method][url] = fn
}

// 查询路由
function findRouter(method, url) {
	method = method.toLowerCase()
	url = url.toLowerCase()

	if(!router[method] || !router[method][url]) {
		return null
	}else {
		return router[method][url]
	}
}

module.exports = { addRouter, findRouter }