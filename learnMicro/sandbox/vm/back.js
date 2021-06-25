// const vm = require('vm');
// global.num = 2;
// const sandbox = {
//   num: 1,
// };
// const script = new vm.Script('num+=1'); //定义js代码
// const context = new vm.createContext(sandbox); //定义执行环境
// const reult = script.runInContext(context);
// console.log(sandbox);

/*结果*/
// {
//   num: 2;
// }
// const vm = require('vm');

// const sandbox = {
//   globalVar: 1,
//   setTimeout: setTimeout,
//   cb: function (result) {
//     console.log(result);
//   },
// };
// vm.createContext(sandbox);
// const script = new vm.Script(
//   `
//     // setTimeout(function(){
//         globalVar++;
//     //     cb(globalVar);
//     //     cb("async result");
//     // }, 1000);
// `,
//   {}
// );
// script.runInContext(sandbox);
// console.log(`globalVar: ${sandbox.globalVar}`);
let a = 4;
const { VM, VMScript } = require('vm2');
const script = new VMScript('let a = 2;a').compile();
let vm = new VM();
console.log(vm.run(script));
console.log(vm.run(a));
