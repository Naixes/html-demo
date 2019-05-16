// 观察者(包含发布订阅模式)
// 实现发布订阅
class Dep {
    constructor() {
        // 存放所有的watcher
        this.subs = []
    }
    // 订阅
    addSub(watcher) {
        this,subs.push(watcher)
    }
    // 发布
    notify() {
        this.subs.forEach(watcher => {
            watcher.update()
        })
    }
}
// 观察者
class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm
        this.expr = expr
        this.cb = cb
        // 先保存旧值
        this.oldVal = this.get()
    }
    get() {
        // 记录下当前的watcher
        Dep.target = this
        // 保存旧值
        // 这里会调用数据的get方法，会将当前的watcher加入到subs当中
        const value = CompileUtil.getVal(this.vm, this.expr)
        // 要将当前target清空，否则在其他地方获取数据时也会重复加入当前的观察者
        Dep.target = null
        return value
    }
    // 数据更新时执行的方法
    update() {
        let newVal = CompileUtil.getVal(this.vm, this.expr)
        if(newVal !== this.oldVal) {
            this.cb(newVal)
        }
    }
}

// 模板编译
class Compiler {
    constructor(el, vm) {
        // 校验参数

        // 校验el是否为元素
        this.el = this.isElementNode(el) ? el : document.querySelector(el)
        this.vm = vm
        // 将当前的DOM放入内存中
        let fragment = this.el2Fragment(this.el)
        // 编译模板
        this.compile(fragment)
        // 渲染画面
        this.el.appendChild(fragment)
    }
    // 编译模板核心方法
    compile(node) {
        let childNodes = node.childNodes
        // childNodes为伪数组
        ;[...childNodes].forEach(child => {
            if(this.isElementNode(child)) {
                this.compileElementNode(child)
                // 如果还包含子元素继续编译
                if(child.childNodes) {
                    this.compile(child)
                }
            }else {
                this.compileTextNode(child)
            }
        });
    }
    // 编译元素节点
    compileElementNode(node) {
        // 判断是否有v-开头的指令
        let attrs = node.attributes
        ;[...attrs].forEach(sttr => {
            // console.log("attrs",sttr.value)
            let {name, value:expr} = sttr
            if(this.isDirective(name)) {
                let [, directive] = name.split("-")
                // 编译
                CompileUtil[directive](node, expr, this.vm)
            }
        })

    }
    // 编译文本节点
    compileTextNode(node) {
        // test：返回布尔值
        // node.textContent：文本内容
        let content = node.textContent
        // // 自己写的，功能没有分离
        // while(/\{\{(.+?)\}\}/.test(node.textContent)) { // content:xxx{{}} {{}}
        //     // expr[0]：{{xx.xx}};expr[1]：xx.xx
        //     let expr = node.textContent.match(/\{\{(.+?)\}\}/)
        //     console.log(expr)
        //     // 获取数据
        //     let value = this.CompileUtil.getVal(this.vm, expr[1])
        //     // console.log(typeof node.textContent, expr[0], value)
        //     // 替换数据
        //     node.textContent = node.textContent.replace(expr[0], value)
        //     // console.log(node.textContent)
        // }

        if(/\{\{(.+?)\}\}/.test(content)) { // content:xxx{{}} {{}}
            CompileUtil["text"](node, content, this.vm)
        }
    }
    // 判断是否为指令
    isDirective(name) {
        return name.startsWith("v-")
    }
    // 判断是否为元素节点
    isElementNode(node) {
        // 1：元素；2：属性；3：文本
        return node.nodeType === 1
    }
    // 将DOM转换为文档片段
    el2Fragment(node) {
        // DocumentFragments 是DOM节点。它们不是主DOM树的一部分。通常的用例是创建文档片段，将元素附加到文档片段，然后将文档片段附加到DOM树。在DOM树中，文档片段被其所有的子元素所代替。

        // 因为文档片段存在于内存中，所以将子元素插入到文档片段时不会引起页面回流（对元素位置和几何上的计算）。因此，使用文档片段通常会带来更好的性能。
        let fragment = document.createDocumentFragment()
        let firstChild = null
        while(firstChild = node.firstChild) {
            // console.log("firstChild",firstChild)
            // console.log("nodeType",firstChild.nodeType)
            // appendChild有移动DOM的功能
            fragment.appendChild(firstChild)
        }
        return fragment
    }
}

// 数据劫持
class Observer {
    constructor(data) {
        this.observer(data)
    }
    observer(data) {
        // 校验传入的参数
        if(data && typeof data === "object") {
            for(const key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(data, key, value) {
        // 如果该值也是一个对象，对这个对象也进行劫持
        this.observer(data[key])
        // 给每一个属性增加发布订阅的功能
        let dep = new Dep()
        Object.defineProperty(data, key, {
            get() {
                // 获取属性值时判断是否有新的观察者并将它添加到subs中
                Dep.target && dep.subs.push(Dep.target)
                return value
            },
            set:(newVal) => {
                // 如果新值也是一个对象，对这个对象也进行劫持
                this.observer(newVal)
                value = newVal
                dep.notify()
            }
        })
    }
}

// Vue基类
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        if(this.$el) {
            // 数据劫持：将所有的数据转化为Object.defineProperty()
            // Object.defineProperty()
            new Observer(this.$data)
            // 根据数据编译模板
            new Compiler(this.$el, this)
        }
    }
}

// 编译工具
CompileUtil = {
    model(node, expr, vm) {
        const modelUpdate = this.updater["modelUpdate"]

        // 加入观察者
        // 会调用watcher的get方法
        new Watcher(vm, expr, (newVal) => {
            modelUpdate(node, newVal)
        })

        // 双向绑定，实现画面改变数据：添加事件
        node.addEventListener("input", (e) => {
            this.setVal(vm, expr, e.target.value)
        })

        let value = this.getVal(vm, expr)
        modelUpdate(node, value)
    },
    html() {},
    text(node, expr, vm) {
        const textUpdate = this.updater["textUpdate"]
        // 获取替换过后的文本
        let content = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {

            // 给每一个{{}}加上观察者
            // 会调用watcher的get方法
            new Watcher(vm, args[1], (newVal) => {
                textUpdate(node, this.getTextContentValue(vm, expr))
            })

            // ...args: 匹配到的内容，括号中的内容，开始的索引，原始字符串
            // 这里会对匹配到的内容进行循环
            // console.log(...args)
            return this.getVal(vm, args[1])
        })
        // console.log(content)
        textUpdate(node, content)
    },
    updater: {
        modelUpdate(node, value) {
            node.value = value
        },
        htmlUpdate() {

        },
        // 处理文本更新
        // 参数：节点，文本内容
        textUpdate(node, value) {
            node.textContent = value
        }
    },
    // 获取存在插值表达式的文本的值
    getTextContentValue(vm, expr) {
        return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
            return this.getVal(vm, args[1])
        })
    },
    // 获取模板中表达式的值
    getVal(vm, expr) {
        console.log(expr)
        // expr:stu.name
        // data就是给的初始值vm.$data，以及每一轮的返回值
        return expr.split(".").reduce((data, current)=>{
            return data[current]
        }, vm.$data)
    },
    // 修改数据
    setVal(vm, expr, value) {
        expr.split(".").reduce((data, current, index, arr) => {
            if(index === arr.length - 1) {
                return data[current] = value
            }
            return data[current]
        }, vm.$data)
    }
}
