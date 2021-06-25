const vm = require('vm');
const script = new vm.Script('m + n');
const sandbox = { m: 1, n: 2, setTimeout: setTimeout };
const context = new vm.createContext(sandbox);
console.log(script.runInContext(context));
//对代码的延迟时间 对于异步不生效
// const script = new vm.Script('setTimeout(()=>{},2000)', { timeout: 50 });
