// 1. 隔离
// 2. 通过数组保证顺序
// 3. 缓存引用模块的值到仓库(module)，方便多处调用

// 仓库
(function (modules) {
    // 1. 按照顺序执行模块
    // 2. 存值
    // 3. 取值
    var installModules = {} // 存值
    function require(moduleId) {
        if(installModules[moduleId]) {
            return installModules[moduleId]
        }
        // 存值
        var module = installModules[moduleId] = {
            id: moduleId,
            isCalled: false,
            exports: {}// 当前模块exports的值
        }
        // 执行
        modules[moduleId].call(module.exports,module,require)
        module.isCalled = true
        // 返回
        return module.exports
    }
    // 入口
    require(0)
})([
    // module 仓库
    function(module, require) {
        // b.js
        // import name from 'a.js'
        var name = require(1)
        function getName() {
            console.log(name);
        }
        getName()
    },
    function(module, require) {
        // a.js
        var name = 'naixes'
        // export default name
        module.exports = name
    },
])