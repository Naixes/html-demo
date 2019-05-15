class Compiler{
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
                this.CompileUtil[directive](node, expr, this.vm)
            }
        })

    }
    // 编译工具
    CompileUtil = {
        model(node, expr, vm) {
            const fn = this.updater["modelUpdate"]
            let value = this.getVal(vm, expr)
            fn(node, value)
        },
        html() {},
        updater: {
            modelUpdate(node, value) {
                node.value = value
            },
            htmlUpdate() {

            }
        },
        // 获取模板中表达式的值
        getVal(vm, expr) {
            // expr:stu.name
            // data就是给的初始值vm.$data，以及每一轮的返回值
            return expr.split(".").reduce((data, current)=>{
                return data[current]
            }, vm.$data)
        }
    }
    // 判断是否为指令
    isDirective(name) {
        return name.startsWith("v-")
    }
    // 编译文本节点
    compileTextNode(node) {
        // test：返回布尔值
        // node.textContent：文本内容
        if(/\{\{(.+?)\}\}/.test(node.textContent)) {
            // expr[0]：{{xx.xx}};expr[1]：xx.xx
            let expr = node.textContent.match(/\{\{(.+?)\}\}/)
            // 获取数据
            let value = this.CompileUtil.getVal(this.vm, expr[1])
            // console.log(typeof node.textContent, expr[0], value)
            // 替换数据
            node.textContent.replace(expr[0], value)
            // console.log(node.textContent)
        }
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

// Vue基类
class Vue {
    constructor(options) {
        this.$el = options.el
        this.$data = options.data
        if(this.$el) {
            // 根据数据编译模板
            new Compiler(this.$el, this)
        }
    }

}