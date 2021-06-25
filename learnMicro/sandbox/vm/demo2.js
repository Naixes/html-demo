//JS的特殊性导致代码逃逸！！！js的黑魔法实际上还是能逃脱
const vm = require('vm');
Object.prototype.yideng = '测试';

// global.yideng = function () {};
console.log('outter', (1.0).yideng);
// const sandbox = {
//   //   yideng: 30,
//   cb: function (result) {
//     console.log(result);
//   },
// };
const sandbox = Object.create(null);
sandbox.cb = function (result) {
  console.log(result);
};
const script = new vm.Script(
  `
    cb(eval("(()=>{return this;})()"));
    // this.constructor.constructor("return process")().exit()
`,
  {}
);
// const script = new vm.Script(
//   'this.constructor.constructor("return process")().exit()'
// );
const context = vm.createContext(sandbox);
console.log(script.runInContext(context));
