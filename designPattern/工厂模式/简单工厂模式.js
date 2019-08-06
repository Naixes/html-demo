// 简单工厂模式
let userFactory = function(role) {
    function User(opt) {
        this.name = opt.name
        this.pages = opt.pages
    }
    switch(role) {
        case 'superAdmin':
            return new User({name: '超级管理员', pages: ['home', 'address', 'data', 'manage']})
        case 'admin': 
            return new User({name: '管理员', pages: ['home', 'address', 'data']})
        case 'user': 
            return new User({name: '普通用户', pages: ['home', 'address']})
        default: 
            throw new Error('参数错误，可选参数：superAdmin', 'admin', 'user')
    }
}

let admin = userFactory('admin')
console.log(admin)