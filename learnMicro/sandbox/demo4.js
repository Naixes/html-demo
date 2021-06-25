//通过以上沙箱来完善运行的代码
const newSandBoxWindow = SandboxWindow({}, context, sandboxGlobal);

const codeStr = 'var test = 1;';
const run = (code) => {
  window.eval(`
;(function(global, self){with(global){;${code}}}).bind(newSandBoxWindow)(newSandBoxWindow, newSandBoxWindow);
`);
};

run(codeStr);
console.log(newSandBoxWindow.window.test); // 1
console.log(window.test); // undefined
// 操作沙箱环境下的全局变量
newSandBoxWindow.history.pushState(null, null, '/index');
newSandBoxWindow.locaiton.hash = 'about';
