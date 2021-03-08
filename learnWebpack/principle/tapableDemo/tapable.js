// 模拟tapable的hook
class Hook {
    constructor() {
        this.taps = []
    }
    tab(options, cb) {
        // 处理options
        // 根据options对taps进行重新排序：源码_insert()
        if(options.before) {
            // ...
        }
        this.tab.push(cb)
    }
    call(options) {
        this.tabs.forEach(callback => {
            callback(options)
        });
    }
}