class Sandbox {
  name;
  constructor(name, context = {}) {
    this.name = name;
    const fakeWindow = Object.create({});
    return new Proxy(fakeWindow, {
      set(target, name, value) {
        if (Object.keys(context).includes(name)) {
          context[name] = value;
        }
        target[name] = value;
      },
      get(target, name) {
        // 优先使用共享对象
        if (Object.keys(context).includes(name)) {
          return context[name];
        }
        if (typeof target[name] === 'function' && /^[a-z]/.test(name)) {
          return target[name].bind && target[name].bind(target);
        } else {
          return target[name];
        }
      },
    });
  }
  //  ...
}

/*
 * 注意这里的context十分关键，因为我们的fakeWindow是一个空对象，window上的属性都没有，
 * 实际项目中这里的context应该包含大量的window属性，
 */

// 初始化2个沙箱，共享doucment与一个全局变量
const context = { document: window.document, globalData: 'abc' };

const newSandBox1 = new Sandbox('app1', context);
const newSandBox2 = new Sandbox('app2', context);
newSandBox1.test = 1;
newSandBox2.test = 2;
window.test = 3;
/*
 * 每个环境的私有属性是隔离的
 */
console.log(newSandBox1.test, newSandBox2.test, window.test); // 1 2 3;
/*
 * 共享属性是沙盒共享的,这里newSandBox2环境中的globalData也被改变了
 */
newSandBox1.globalData = '123';
console.log(newSandBox1.globalData, newSandBox2.globalData); // 123  123;
