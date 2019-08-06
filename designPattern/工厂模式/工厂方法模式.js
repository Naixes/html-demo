// 本意是将实际创建对象的工作推迟到子类中
// 安全模式创建工厂方法函数
let userFactory = function(role) {
    if(this instanceof userFactory) {
        console.log('使用了new')
        // 实例化子类
        return new this[role]()
    } else {
        console.log('没有使用new')
        return new userFactory(role)
    }
}

userFactory.prototype = {
    // 子类
    superAdmin: function() {
        this.name = "超级管理员",
        this.pages = ['home', 'address', 'data', 'manage']
    },
    admin: function() {
        this.name = "管理员",
        this.pages = ['home', 'address', 'data']
    },
    user: function() {
        this.name = "普通用户",
        this.pages = ['home', 'address']
    }
}

let admin = new userFactory('admin')
let user = userFactory('user')
console.log(admin)
console.log(user)