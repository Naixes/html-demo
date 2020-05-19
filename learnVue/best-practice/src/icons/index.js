// 获取加载函数
// 参数：上下文，是否检索子目录，加载规则，返回是一个函数
// 有id属性，keys，resolve等方法
const req = require.context('./svg', false, /\.svg$/)
// keys方法返回文件的键组成的数组
// req方法传入文件的键会得到一个标准的es module
// 利用map就可以返回所有文件的es module，住过这个文件呗mian.js引用，就会进入webpack的模块依赖中，会被打包
req.keys().map(req)