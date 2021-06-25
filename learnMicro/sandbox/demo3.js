/**
 * 1.子应用的history得由父应用提供
 * 2.子应用的类似于XMLHttpRequest由自己提供
 * 3.微应用创建的全局变量得控制在iframe window中
 */
class SandboxWindow {
  constructor(options, context, frameWindow) {
    return new Proxy(frameWindow, {
      set(target, name, value) {
        console.log('target: ', target);

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
}

const iframe = document.createElement('iframe', { url: 'about:blank' });
document.body.appendChild(iframe);
const sandboxGlobal = iframe.contentWindow;
// 需要全局共享的变量
const context = { document: window.document, history: window.histroy };
const newSandBoxWindow = new SandboxWindow({}, context, sandboxGlobal);
newSandBoxWindow.abc = '京程一灯';
console.log('newSandBoxWindow.abc: ', newSandBoxWindow.abc);
console.log('window.abc: ', window.abc);
// newSandBoxWindow.history 全局对象
// newSandBoxWindow.abc 为 'abc' 沙箱环境全局变量
// window.abc 为 undefined
