let o = {
  name: "Naixes",
  age:22,
  hobbies: {
    a: "read"
  }
}

function observer(o) {
    if (typeof o === "object") {
      for (const key in o) {
        // 数据劫持，利用definProperty添加响应式
        defineReactive(o, key, o[key])
      }
    } 
}

function defineReactive(o, key, val) {
  // 2.如果对象的值是对象也要添加响应式 
  observer(val)
  Object.defineProperty(o, key, {
    get() {
      return val
    },
    set(newVal) {
      // 3.如果新值是对象也要添加响应式 
      observer(newVal)
      // 1.对象的值改变时的操作
      console.log("数据更新", newVal)
      val = newVal
    }
  })
}

observer(o)

// 1
o.name = "N"
// 2
o.hobbies.a = "run"
// 3
o.hobbies = {
  b: "run"
}
o.hobbies.b = "painting"
// ***修改之前没有的属性不会触发，可以使用vm.$set
o.hobbies.c = "swimming"
// 4
// 由于defineProperty不支持数组，Vue要支持数组需要重写数组的所有方法push，pop，shift等
const arr = ["push", "shift", "unshift"]
arr.forEach(method => {
  let oldMethod = Array.prototype[method]
  Array.prototype[method] = function(val) {
    console.log("数据更新", val)
    // call保证this指向，不写的话相当于oldmethod()，没有指向
    oldMethod.call(this, val)
  }
})

o.hobbies = ["read", "run", "painting"]
o.hobbies.push("swimming")
// ***数组不能通过长度和索引进行修改
o.hobbies.length--
