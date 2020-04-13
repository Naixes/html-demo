// 实例化Vue之后，会使用defineProperty都数据进行响应化注册，在响应化的同时在get方法中进行依赖收集（向订阅中添加当前的的观察者，触发get方法时会进行收集）

// render时都会实例化观察者
// 实例化观察者时，将dep.target更新为当前观察者，同时触发观察者的get方法会触发数据的get方法，进而触发依赖收集

// 当数据发生改变时，触发set方法，通知所有订阅者进行视图更新

class Vue {
    constructor(options) {
        this._data = options.data
        observer(this._data)

        // 模拟render函数中实例化观察者
        new Watcher()

        /* 在这里模拟 render 的过程，触发 test 属性的 get 函数 */
        console.log('render~', this._data.test);
    }
}

// 也可以写成一个类 Observer
function observer(obj) {
    if(!obj || typeof obj !== 'object') {
        return
    }
    console.log(obj)

    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
function defineReactive(obj, key, val) {
    // 如果对象的值是对象也要添加响应式 
    // observer(val)
    const dep = new Dep()

    // 实现响应化
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('注册get')
            // 依赖收集
            /* 将 Dep.target（即当前的 Watcher 对象存入 dep 的 subs 中） */
            dep.addSub(Dep.target)

            return val
        },
        set: function(newVal) {
            // 如果新值是对象也要添加响应式 
            // observer(newVal)
            console.log('data更新')
            if(newVal === val) {
                return
            }
            // 修改
            dep.notify()
        }
    })
}

// 观察者
class Watcher {
    constructor() {
        // 将当前实例赋值给Dep
        Dep.target = this
    }
    // 更新视图
    update() {
        console.log('更新视图~~')
    }
}

// 订阅者
class Dep {
    constructor() {
        // 用来存放Watcher对象的数组
        this.subs = []
    }
    // sub是Watcher对象
    addSub(watcher) {
        this.subs.push(watcher)
    }
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}


let o = new Vue({
    data: {
        test: "I am test."
    }
});
o._data.test = "hello,world.";